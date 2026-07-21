import {
  buildSerializedIndex,
  defineFields,
} from "@fabianwaller/document-search";
import { englishAnalyzer } from "@fabianwaller/document-search/english";
import { englishSynonyms } from "@fabianwaller/document-search/english-synonyms";

import type { BlogPost } from "@/app/(website)/blog/utils";
import type { Project } from "@/lib/projects";

import type {
  CommandSearchData,
  CommandSearchDocument,
} from "./command-search";
import { toSearchableMdxText } from "./search-content";

type CommandSearchSourceDocument =
  | {
      readonly type: "blog";
      readonly title: string;
      readonly href: string;
      readonly external: false;
      readonly summary: string;
      readonly content: string;
    }
  | {
      readonly type: "project";
      readonly title: string;
      readonly href: string;
      readonly external: true;
      readonly description: string | null;
      readonly topics: readonly string[];
      readonly language?: string | null;
      readonly homepage?: string | null;
      readonly readme?: string;
    };

const commandSearchSynonyms = {
  article: ["blog", "post", "writing"],
  blog: ["article", "post", "writing"],
  repo: ["repository", "project", "code"],
  repository: ["repo", "project", "code"],
  nextjs: ["next.js", "next"],
  ios: ["iphone", "ipad"],
};

export function toBlogSearchDocument(
  post: BlogPost,
): CommandSearchSourceDocument {
  return {
    type: "blog",
    title: post.metadata.title,
    href: `/blog/${post.slug}`,
    external: false,
    summary: post.metadata.summary,
    content: toSearchableMdxText(post.content),
  };
}

export function toProjectSearchDocument(
  project: Project,
): CommandSearchSourceDocument {
  return {
    type: "project",
    title: project.full_name,
    href: project.html_url,
    external: true,
    description: project.description,
    topics: project.topics,
    language: project.language,
    homepage: project.homepage,
    readme: project.readme,
  };
}

export function buildCommandSearchData(
  documents: readonly CommandSearchSourceDocument[],
): CommandSearchData {
  return buildSerializedIndex<
    CommandSearchSourceDocument,
    CommandSearchDocument
  >(documents, {
    fields: defineFields<CommandSearchSourceDocument>(
      { name: "title", value: (document) => document.title, weight: 5 },
      {
        name: "description",
        value: (document) =>
          document.type === "blog" ? document.summary : document.description,
        weight: 3,
      },
      {
        name: "project_attributes",
        value: (document) =>
          document.type === "project"
            ? [document.topics, document.language, document.homepage]
            : null,
        weight: 2,
      },
      {
        name: "content",
        value: (document) =>
          document.type === "blog" ? document.content : document.readme,
        weight: 1,
        expandSynonyms: true,
      },
    ),
    analyzer: englishAnalyzer(),
    synonyms: [englishSynonyms, commandSearchSynonyms],
    store: (document) => ({
      type: document.type,
      title: document.title,
      href: document.href,
      external: document.external,
      description:
        document.type === "blog" ? document.summary : document.description,
    }),
  });
}
