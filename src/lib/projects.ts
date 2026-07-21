export type Project = {
  readonly type?: "closed";
  readonly full_name: string;
  readonly html_url: string;
  readonly description: string | null;
  readonly topics: readonly string[];
  readonly pushed_at?: string | null;
  readonly stargazers_count?: number;
  readonly fork?: boolean;
  readonly language?: string | null;
  readonly homepage?: string | null;
  readonly archived?: boolean;
  readonly default_branch?: string;
  readonly readme?: string;
};

type ProjectFetchOptions = RequestInit & {
  readonly next?: {
    readonly revalidate?: number;
  };
};

const GITHUB_REPOS_URL = "https://api.github.com/users/fabianwaller/repos";
const PROFILE_REPO = "fabianwaller/fabianwaller";
const REPO_BLACKLIST = new Set([PROFILE_REPO, "fabianwaller/FFA", "fabianwaller/RewexBungeecord", "fabianwaller/Aura", "fabianwaller/Lobby", "fabianwaller/Server", "fabianwaller/enhsp-xaip", "fabianwaller/classical-domains", "fabianwaller/lab", "fabianwaller/api-tools"]);

export const getClosedSourceProjects = (): Project[] => [
  {
    type: "closed",
    full_name: "fabianwaller/repsset",
    html_url: "https://testflight.apple.com/join/VXFAv9Gp",
    description: "Delightful workout tracker for iOS",
    topics: ["expo", "react-native", "typescript", "tailwindcss", "zustand"],
    pushed_at: new Date("2026-06-24").toISOString(),
    readme:
      "Repsset is a private iOS workout tracker built with Expo, React Native, TypeScript, Tailwind CSS, and Zustand.",
  },
  {
    type: "closed",
    full_name: "fabianwaller/fcd",
    html_url: "https://www.xn--fcdppenweiler-yob.de/",
    description: "Website template with PayloadCMS for football clubs",
    topics: ["nextjs", "typescript", "tailwindcss", "payloadcms"],
    pushed_at: new Date("2025-03-11").toISOString(),
    readme:
      "Club website for FC Düppenweiler built with Next.js, TypeScript, Tailwind CSS, and Payload CMS.",
  },
];

export const compareProjects = (a: Project, b: Project) => {
  if (new Date(a.pushed_at ?? 0) < new Date(b.pushed_at ?? 0)) {
    return 1;
  }
  if (new Date(a.pushed_at ?? 0) > new Date(b.pushed_at ?? 0)) {
    return -1;
  }
  return 0;
};

function getGitHubHeaders(accept: string): HeadersInit {
  const headers: Record<string, string> = {
    Accept: accept,
    "User-Agent": "fabianwaller-website-search-index",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchPublicRepos(options?: ProjectFetchOptions) {
  const res = await fetch(GITHUB_REPOS_URL, {
    ...options,
    headers: {
      ...getGitHubHeaders("application/vnd.github+json"),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub repositories: ${res.status}`);
  }

  return (await res.json()) as Project[];
}

export async function getProjects(options?: ProjectFetchOptions) {
  const data = await fetchPublicRepos(options);
  data.push(...getClosedSourceProjects());
  return data
    .filter((repo) => !REPO_BLACKLIST.has(repo.full_name))
    .sort(compareProjects);
}

export async function getProjectReadme(project: Project) {
  if (project.type === "closed") return project.readme ?? "";

  if (project.default_branch) {
    try {
      const rawReadme = await fetch(
        `https://raw.githubusercontent.com/${project.full_name}/${project.default_branch}/README.md`,
      );

      if (rawReadme.ok) return rawReadme.text();
    } catch {
      // Fall back to GitHub's README endpoint below.
    }
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${project.full_name}/readme`,
      {
        headers: getGitHubHeaders("application/vnd.github.raw"),
      },
    );

    if (!res.ok) return "";

    return res.text();
  } catch {
    return "";
  }
}

export async function getProjectsWithReadmes() {
  const projects = await getProjects();
  return Promise.all(
    projects.map(async (project) => ({
      ...project,
      readme: await getProjectReadme(project),
    })),
  );
}
