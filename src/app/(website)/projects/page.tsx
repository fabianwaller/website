import Section from "@/components/Section";

import ProjectCards from "./ProjectCards";

const getRepos = async () => {
  // Revalidate at most every hour
  const res = await fetch("https://api.github.com/users/fabianwaller/repos", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  data.push(...getClosedSourceProjects());
  data.sort(compare);
  return data;
};

const getClosedSourceProjects = () => {
  return [
    {
      type: "closed",
      full_name: "Website FC Düppenweiler",
      html_url: "https://www.xn--fcdppenweiler-yob.de/",
      description: "Vereinswebsite",
      topics: ["nextjs", "typescript", "tailwindcss", "payloadcms"],
      pushed_at: new Date("2025-03-11").toISOString(),
    },
  ];
};

const compare = (a: any, b: any) => {
  if (new Date(a.pushed_at) < new Date(b.pushed_at)) {
    return 1;
  }
  if (new Date(a.pushed_at) > new Date(b.pushed_at)) {
    return -1;
  }
  return 0;
};

const Projects = async () => {
  const data: any[] = await getRepos();

  const filteredData = data.filter(
    (repo) => repo.full_name !== "fabianwaller/fabianwaller",
  );

  return (
    <Section
      name="projects"
      title="Projects"
      subtitle="my private projects and public code repos"
    >
      <ProjectCards data={filteredData} />
    </Section>
  );
};

export default Projects;
