import Section from "@/components/Section";
import {
  compareProjects,
  getClosedSourceProjects,
  getProjects,
} from "@/lib/projects";

import ProjectCards from "./ProjectCards";

async function getProjectPageData() {
  try {
    return await getProjects({
      // Revalidate at most every hour
      next: { revalidate: 3600 },
    });
  } catch (error) {
    console.warn(`GitHub project fetch failed: ${error}`);
    return getClosedSourceProjects().sort(compareProjects);
  }
}

const Projects = async () => {
  const data = await getProjectPageData();

  return (
    <Section
      name="projects"
      title="Projects"
      subtitle="my private projects and public code repos"
    >
      <ProjectCards data={data} />
    </Section>
  );
};

export default Projects;
