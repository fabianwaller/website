import {
  DocumentSearchIndex,
  searchFields,
} from "@/lib/search/document-search";

type Article = {
  slug: string;
  metadata: {
    title: string;
    summary: string;
  };
  content: string;
};

type Exercise = {
  aliases: string[] | null;
  category: "strength" | "stretching";
  date_created: string;
  date_updated: string;
  description: string | null;
  equipment: "barbell" | "dumbbell" | null;
  force: "push" | "pull" | null;
  id: string;
  instructions: string[] | null;
  level: "beginner" | "intermediate";
  mechanic: "compound" | "isolation" | null;
  name: string;
  primary_muscles: string[] | null;
  secondary_muscles: string[] | null;
  tips: string[] | null;
};

const articles: Article[] = [
  {
    slug: "errors",
    metadata: {
      title: "Client side error handling",
      summary: "Typed failures in server actions",
    },
    content:
      "The article explains exceptions, validation faults, and frontend messages.",
  },
  {
    slug: "cdn",
    metadata: {
      title: "Caching and content delivery networks",
      summary: "How edge caches improve website performance",
    },
    content:
      "Store responses near users with stale if error behavior and SSL termination.",
  },
  {
    slug: "clean-code",
    metadata: {
      title: "Heuristics for clean code",
      summary: "Principles for readable software",
    },
    content: "Guidelines keep modules maintainable and tidy.",
  },
];

const articleText = searchFields<Article>(
  (article) => article.metadata.title,
  (article) => article.metadata.summary,
  (article) => article.content,
);

describe("DocumentSearchIndex", () => {
  it("ranks documents by caller-selected string fields", () => {
    const index = new DocumentSearchIndex(articles, { getText: articleText });

    const [result] = index.search("validation fault messages");

    expect(result.document.slug).toBe("errors");
    expect(result.score).toBeGreaterThan(0);
  });

  it("expands configured synonyms so semantic matches are returned", () => {
    const index = new DocumentSearchIndex(articles, { getText: articleText });

    const [result] = index.search("browser exception");

    expect(result.document.slug).toBe("errors");
    expect(result.matchedTerms).toEqual(
      expect.arrayContaining(["client", "error"]),
    );
  });

  it("allows package-like consumers to provide domain synonyms without app coupling", () => {
    const index = new DocumentSearchIndex(articles, {
      getText: articleText,
      synonyms: {
        resilient: ["stale"],
      },
    });

    const [result] = index.search("resilient responses");

    expect(result.document.slug).toBe("cdn");
  });

  it("indexes arbitrary objects with different keys, arrays, nullable values, and enum-like values", () => {
    const exercises: Exercise[] = [
      {
        aliases: ["bench press", "chest press"],
        category: "strength",
        date_created: "2024-01-01",
        date_updated: "2024-01-02",
        description: "Horizontal pressing movement for upper body strength.",
        equipment: "barbell",
        force: "push",
        id: "barbell-bench-press",
        instructions: ["Lie on the bench", "Press the bar from the chest"],
        level: "beginner",
        mechanic: "compound",
        name: "Barbell Bench Press",
        primary_muscles: ["chest"],
        secondary_muscles: ["triceps", "shoulders"],
        tips: null,
      },
      {
        aliases: null,
        category: "strength",
        date_created: "2024-01-01",
        date_updated: "2024-01-02",
        description: "Lower body squat pattern.",
        equipment: "dumbbell",
        force: "push",
        id: "goblet-squat",
        instructions: ["Hold a dumbbell", "Squat between the knees"],
        level: "beginner",
        mechanic: "compound",
        name: "Goblet Squat",
        primary_muscles: ["quadriceps", "glutes"],
        secondary_muscles: null,
        tips: ["Keep the torso tall"],
      },
    ];

    const index = new DocumentSearchIndex(exercises, {
      getText: searchFields<Exercise>(
        (exercise) => exercise.name,
        (exercise) => exercise.aliases,
        (exercise) => exercise.category,
        (exercise) => exercise.description,
        (exercise) => exercise.equipment,
        (exercise) => exercise.force,
        (exercise) => exercise.instructions,
        (exercise) => exercise.level,
        (exercise) => exercise.mechanic,
        (exercise) => exercise.primary_muscles,
        (exercise) => exercise.secondary_muscles,
        (exercise) => exercise.tips,
      ),
    });

    const [result] = index.search("barbell chest triceps");

    expect(result.document.id).toBe("barbell-bench-press");
  });
});
