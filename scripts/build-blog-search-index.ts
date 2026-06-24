import fs from "node:fs";
import path from "node:path";
import {
  buildSerializedIndex,
  defineFields,
} from "@fabianwaller/document-search";
import { englishSynonyms } from "@fabianwaller/document-search/english-synonyms";
import { englishAnalyzer } from "@fabianwaller/document-search/english";

import { getBlogPosts } from "../src/app/(website)/blog/utils";

const outputPath = path.join(
  process.cwd(),
  "src/generated/blog-search-data.json",
);
const blogPosts = getBlogPosts();
const searchData = buildSerializedIndex(blogPosts, {
  fields: defineFields(
    {
      name: "title",
      value: (post) => post.metadata.title,
      weight: 3,
    },
    {
      name: "summary",
      value: (post) => post.metadata.summary,
      weight: 2,
    },
    {
      name: "content",
      value: (post) => post.content,
      expandSynonyms: true,
    },
  ),
  analyzer: englishAnalyzer(),
  synonyms: englishSynonyms,
  store: (post) => ({
    slug: post.slug,
    title: post.metadata.title,
  }),
});
const serialized = `${JSON.stringify(searchData)}\n`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

if (
  !fs.existsSync(outputPath) ||
  fs.readFileSync(outputPath, "utf8") !== serialized
) {
  fs.writeFileSync(outputPath, serialized);
}

console.log(
  `Built blog search index: ${searchData.documents.length} documents, ${Buffer.byteLength(serialized)} bytes`,
);
