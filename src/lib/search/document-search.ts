export type SearchPrimitive = string | number | boolean | null | undefined;
export type SearchFieldValue = SearchPrimitive | readonly SearchFieldValue[];
export type SearchTextResolver<TDocument> = (
  document: TDocument,
) => SearchFieldValue;

export type SearchResult<TDocument> = {
  document: TDocument;
  score: number;
  matchedTerms: string[];
};

export type SynonymMap = Record<string, readonly string[]>;

export type DocumentSearchOptions<TDocument> = {
  getText: SearchTextResolver<TDocument>;
  synonyms?: SynonymMap;
  stopWords?: ReadonlySet<string>;
  minScore?: number;
};

type IndexedDocument<TDocument> = {
  document: TDocument;
  vector: Map<string, number>;
  norm: number;
};

const DEFAULT_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "for",
  "from",
  "has",
  "have",
  "how",
  "in",
  "into",
  "is",
  "it",
  "its",
  "of",
  "on",
  "or",
  "that",
  "the",
  "their",
  "this",
  "to",
  "was",
  "we",
  "with",
  "you",
  "your",
]);

const DEFAULT_SYNONYMS: SynonymMap = {
  cache: ["store", "buffer", "memoize", "cdn"],
  client: ["browser", "frontend", "ui"],
  clean: ["maintainable", "readable", "tidy"],
  code: ["software", "program"],
  delivery: ["distribution", "transport"],
  error: ["exception", "failure", "fault"],
  fast: ["quick", "rapid", "performant"],
  heuristic: ["rule", "guideline", "principle"],
  network: ["cdn", "edge", "internet"],
  server: ["backend", "api"],
};

export class DocumentSearchIndex<TDocument> {
  private readonly documents: IndexedDocument<TDocument>[];
  private readonly documentFrequency = new Map<string, number>();
  private readonly getText: SearchTextResolver<TDocument>;
  private readonly synonyms: Map<string, string[]>;
  private readonly stopWords: ReadonlySet<string>;
  private readonly minScore: number;
  private readonly documentCount: number;

  constructor(
    documents: readonly TDocument[],
    options: DocumentSearchOptions<TDocument>,
  ) {
    this.getText = options.getText;
    this.synonyms = buildBidirectionalSynonymMap({
      ...DEFAULT_SYNONYMS,
      ...options.synonyms,
    });
    this.stopWords = options.stopWords ?? DEFAULT_STOP_WORDS;
    this.minScore = options.minScore ?? 0;
    this.documentCount = documents.length;

    const termFrequencies = documents.map((document) => ({
      document,
      terms: this.termFrequencies(this.documentText(document)),
    }));

    for (const { terms } of termFrequencies) {
      for (const term of terms.keys()) {
        this.documentFrequency.set(
          term,
          (this.documentFrequency.get(term) ?? 0) + 1,
        );
      }
    }

    this.documents = termFrequencies.map(({ document, terms }) => {
      const vector = this.toTfIdfVector(terms);
      return { document, vector, norm: vectorNorm(vector) };
    });
  }

  search(query: string, limit = 5): SearchResult<TDocument>[] {
    const queryVector = this.toTfIdfVector(this.termFrequencies(query));
    const queryNorm = vectorNorm(queryVector);
    if (queryNorm === 0) return [];

    return this.documents
      .map(({ document, vector, norm }) => ({
        document,
        score: cosineSimilarity(queryVector, queryNorm, vector, norm),
        matchedTerms: intersectTerms(queryVector, vector),
      }))
      .filter((result) => result.score > this.minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  searchableText(document: TDocument): string {
    return this.tokenize(this.documentText(document)).join(" ");
  }

  private documentText(document: TDocument) {
    return flattenSearchFieldValue(this.getText(document)).join(" ");
  }

  private termFrequencies(text: string) {
    const terms = new Map<string, number>();
    for (const term of this.tokenize(text)) {
      terms.set(term, (terms.get(term) ?? 0) + 1);
    }
    return terms;
  }

  private tokenize(text: string) {
    const normalized = text
      .toLowerCase()
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();

    if (!normalized) return [];

    return normalized
      .split(/\s+/)
      .map(stem)
      .filter((term) => term.length > 1 && !this.stopWords.has(term))
      .flatMap((term) => [term, ...(this.synonyms.get(term) ?? [])]);
  }

  private toTfIdfVector(terms: Map<string, number>) {
    const vector = new Map<string, number>();
    for (const [term, count] of terms) {
      const df = this.documentFrequency.get(term) ?? 0;
      const idf = Math.log(this.documentCount + 1) - Math.log(df + 1) + 1;
      vector.set(term, (1 + Math.log(count)) * idf);
    }
    return vector;
  }
}

export function searchFields<TDocument>(
  ...resolvers: SearchTextResolver<TDocument>[]
): SearchTextResolver<TDocument> {
  return (document) => resolvers.map((resolver) => resolver(document));
}

function flattenSearchFieldValue(value: SearchFieldValue): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => flattenSearchFieldValue(item));
  }

  if (value === null || value === undefined) {
    return [];
  }

  return [String(value)];
}

function buildBidirectionalSynonymMap(synonyms: SynonymMap) {
  const map = new Map<string, Set<string>>();
  for (const [term, related] of Object.entries(synonyms)) {
    const normalizedTerm = stem(term.toLowerCase());
    for (const synonym of related) {
      const normalizedSynonym = stem(synonym.toLowerCase());
      if (!map.has(normalizedTerm)) map.set(normalizedTerm, new Set());
      if (!map.has(normalizedSynonym)) map.set(normalizedSynonym, new Set());
      map.get(normalizedTerm)!.add(normalizedSynonym);
      map.get(normalizedSynonym)!.add(normalizedTerm);
    }
  }
  return new Map([...map.entries()].map(([key, values]) => [key, [...values]]));
}

function stem(term: string) {
  return term
    .replace(/ies$/, "y")
    .replace(/(ingly|edly|ing|ed|ly|es|s)$/, "")
    .replace(/(.)\1$/, "$1");
}

function vectorNorm(vector: Map<string, number>) {
  return Math.sqrt(
    [...vector.values()].reduce((sum, value) => sum + value * value, 0),
  );
}

function cosineSimilarity(
  a: Map<string, number>,
  aNorm: number,
  b: Map<string, number>,
  bNorm: number,
) {
  if (aNorm === 0 || bNorm === 0) return 0;
  let dot = 0;
  for (const [term, value] of a) {
    dot += value * (b.get(term) ?? 0);
  }
  return dot / (aNorm * bNorm);
}

function intersectTerms(a: Map<string, number>, b: Map<string, number>) {
  return [...a.keys()].filter((term) => b.has(term));
}
