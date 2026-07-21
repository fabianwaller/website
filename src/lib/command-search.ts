import type {
  SearchIndex,
  SerializedSearchIndex,
} from "@fabianwaller/document-search";
import { loadIndex } from "@fabianwaller/document-search";
import { englishAnalyzer } from "@fabianwaller/document-search/english";

export type CommandSearchDocument = {
  readonly type: "blog" | "project";
  readonly title: string;
  readonly href: string;
  readonly external: boolean;
  readonly description?: string | null;
};

export type CommandSearchData = SerializedSearchIndex<CommandSearchDocument>;

const commandSearchAnalyzer = englishAnalyzer();

export function loadCommandSearchIndex(
  searchData: CommandSearchData,
): SearchIndex<CommandSearchDocument> {
  return loadIndex(searchData, { analyzer: commandSearchAnalyzer });
}

export function searchCommandDocuments(
  index: SearchIndex<CommandSearchDocument>,
  searchTerm: string,
) {
  const text = searchTerm.trim();

  if (!text) return index.documents;

  return index
    .search({
      text,
      limit: index.documents.length,
    })
    .map((result) => result.document);
}
