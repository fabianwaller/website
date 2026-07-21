import {
  buildCommandSearchData,
  toBlogSearchDocument,
  toProjectSearchDocument,
} from "@/lib/command-search-build";
import {
  loadCommandSearchIndex,
  searchCommandDocuments,
} from "@/lib/command-search";
import { toSearchableMdxText } from "@/lib/search-content";
import type { BlogPost } from "@/app/(website)/blog/utils";
import type { Project } from "@/lib/projects";

function makePost(overrides: Partial<BlogPost>): BlogPost {
  return {
    metadata: {
      title: "Article",
      publishedAt: "2026-01-01",
      summary: "Summary",
      ...overrides.metadata,
    },
    slug: "article",
    content: "Body content",
    ...overrides,
  };
}

function makeProject(overrides: Partial<Project>): Project {
  return {
    full_name: "fabianwaller/project",
    html_url: "https://github.com/fabianwaller/project",
    description: "Project description",
    topics: [],
    pushed_at: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("command search", () => {
  it("normalizes MDX content so body terms are searchable", () => {
    const text = toSearchableMdxText(`
---
title: Hidden metadata
---

import Demo from "./Demo";

## Observable lifetimes

<Callout tone="info">Durable subscriptions survive refreshes.</Callout>

[Next docs](https://nextjs.org/docs)

\`\`\`ts title="serializable errors"
const typedFailure = true;
\`\`\`
`);

    expect(text).toContain("Observable lifetimes");
    expect(text).toContain("Durable subscriptions survive refreshes.");
    expect(text).toContain("Next docs");
    expect(text).toContain("typedFailure");
    expect(text).not.toContain("Hidden metadata");
    expect(text).not.toContain("import Demo");
  });

  it("searches blog article body text", () => {
    const data = buildCommandSearchData([
      toBlogSearchDocument(
        makePost({
          metadata: {
            title: "Caching",
            publishedAt: "2026-01-01",
            summary: "Caching summary",
          },
          slug: "caching",
          content: "The article explains surrogate key invalidation.",
        }),
      ),
    ]);

    const results = searchCommandDocuments(
      loadCommandSearchIndex(data),
      "surrogate invalidation",
    );

    expect(results[0]).toMatchObject({
      type: "blog",
      href: "/blog/caching",
      title: "Caching",
    });
  });

  it("searches project descriptions, topics, languages, and README text", () => {
    const data = buildCommandSearchData([
      toProjectSearchDocument(
        makeProject({
          full_name: "fabianwaller/repsset",
          description: "Delightful workout tracker for iOS",
          topics: ["expo", "react-native", "zustand"],
          language: "TypeScript",
          readme: "Tracks progressive overload and rest timers.",
        }),
      ),
    ]);
    const index = loadCommandSearchIndex(data);

    expect(searchCommandDocuments(index, "workout")[0]?.title).toBe(
      "fabianwaller/repsset",
    );
    expect(searchCommandDocuments(index, "zustand")[0]?.title).toBe(
      "fabianwaller/repsset",
    );
    expect(
      searchCommandDocuments(index, "progressive overload")[0]?.title,
    ).toBe("fabianwaller/repsset");
  });

  it("ranks title matches above content-only matches", () => {
    const data = buildCommandSearchData([
      toBlogSearchDocument(
        makePost({
          metadata: {
            title: "Architecture Notes",
            publishedAt: "2026-01-01",
            summary: "Mentions command palette design.",
          },
          slug: "notes",
          content: "The body references command palette behavior.",
        }),
      ),
      toProjectSearchDocument(
        makeProject({
          full_name: "fabianwaller/command-palette",
          description: "A small UI project.",
        }),
      ),
    ]);

    const results = searchCommandDocuments(
      loadCommandSearchIndex(data),
      "command palette",
    );

    expect(results[0]?.title).toBe("fabianwaller/command-palette");
  });

  it("returns all matching documents without the package default cap", () => {
    const documents = Array.from({ length: 8 }, (_, index) =>
      toProjectSearchDocument(
        makeProject({
          full_name: `fabianwaller/search-${index}`,
          description: "Searchable project",
        }),
      ),
    );

    const results = searchCommandDocuments(
      loadCommandSearchIndex(buildCommandSearchData(documents)),
      "searchable",
    );

    expect(results).toHaveLength(8);
  });
});
