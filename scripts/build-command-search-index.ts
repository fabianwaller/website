import fs from "node:fs";
import path from "node:path";

import { getBlogPosts } from "../src/app/(website)/blog/utils";
import {
  buildCommandSearchData,
  toBlogSearchDocument,
  toProjectSearchDocument,
} from "../src/lib/command-search-build";
import {
  compareProjects,
  getClosedSourceProjects,
  getProjectReadme,
  getProjectsWithReadmes,
  type Project,
} from "../src/lib/projects";

const outputPath = path.join(
  process.cwd(),
  "src/generated/command-search-data.json",
);
const githubReposUrl = "https://api.github.com/users/fabianwaller/repos";
const profileRepo = "fabianwaller/fabianwaller";

function decodeFetchCacheBody(body: unknown) {
  if (typeof body !== "string") return null;

  const decoded = Buffer.from(body, "base64").toString("utf8");
  try {
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function readCachedPublicRepos(): Project[] {
  const fetchCacheDir = path.join(process.cwd(), ".next/cache/fetch-cache");
  if (!fs.existsSync(fetchCacheDir)) return [];

  for (const file of fs.readdirSync(fetchCacheDir)) {
    const filePath = path.join(fetchCacheDir, file);
    if (!fs.statSync(filePath).isFile()) continue;

    try {
      const cached = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (cached?.data?.url !== githubReposUrl) continue;

      const repos = decodeFetchCacheBody(cached.data.body);
      return Array.isArray(repos) ? repos : [];
    } catch {
      continue;
    }
  }

  return [];
}

async function hydrateReadmes(projects: readonly Project[]) {
  return Promise.all(
    projects.map(async (project) => ({
      ...project,
      readme:
        project.full_name === "fabianwaller/website"
          ? fs.readFileSync(path.join(process.cwd(), "README.md"), "utf8")
          : await getProjectReadme(project),
    })),
  );
}

async function getProjectsForSearch() {
  try {
    return await getProjectsWithReadmes();
  } catch (error) {
    console.warn(
      `GitHub repository fetch failed; using cached project data when available. ${error}`,
    );
  }

  const cachedProjects = readCachedPublicRepos();
  const projects = [
    ...cachedProjects.filter((repo) => repo.full_name !== profileRepo),
    ...getClosedSourceProjects(),
  ].sort(compareProjects);

  return hydrateReadmes(projects);
}

async function main() {
  const blogPosts = getBlogPosts().map(toBlogSearchDocument);
  const projects = (await getProjectsForSearch()).map(toProjectSearchDocument);
  const searchData = buildCommandSearchData([...blogPosts, ...projects]);
  const serialized = `${JSON.stringify(searchData)}\n`;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  if (
    !fs.existsSync(outputPath) ||
    fs.readFileSync(outputPath, "utf8") !== serialized
  ) {
    fs.writeFileSync(outputPath, serialized);
  }

  console.log(
    `Built command search index: ${searchData.documents.length} documents, ${Buffer.byteLength(serialized)} bytes`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
