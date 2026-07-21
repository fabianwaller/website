const frontmatterPattern = /^\s*---\s*[\s\S]*?\s*---/;
const importExportPattern = /^(?:import|export)\s.+$/gm;
const fencedCodePattern = /```[^\n]*\n([\s\S]*?)```/g;
const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
const mdxTagPattern = /<\/?[\w.:-]+(?:\s+[^>]*)?>/g;
const markdownTokenPattern = /[`*_~>#|[\]{}]/g;

function normalizeWhitespace(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

export function toSearchableMdxText(source: string) {
  return normalizeWhitespace(
    source
      .replace(frontmatterPattern, " ")
      .replace(importExportPattern, " ")
      .replace(fencedCodePattern, " $1 ")
      .replace(imagePattern, " $1 ")
      .replace(linkPattern, " $1 $2 ")
      .replace(mdxTagPattern, " ")
      .replace(markdownTokenPattern, " "),
  );
}
