import Section, { getAnimationDelay } from "@/components/Section";
import { Button } from "@/components/ui/button";
import VStack from "@/components/VStack";
import { Dot } from "lucide-react";
import Link from "next/link";

const Keyword = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block rounded-lg px-2 py-2 text-sm text-title-normal shadow-custom-soft">
    {children}
  </span>
);

const KeywordList = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C",
  "React",
  "NextJs",
  "Supabase",
  "React Native",
  "HTML",
  "CSS",
  "Sass",
  "Tailwind",
  "Node",
  "Jest",
  "Express",
  "SQL",
  "Docker",
  "Git",
  "Unix",
];

const career = [
  {
    position: "UX Software Engineering Intern",
    company: "Ergosign",
    location: "Saarbrücken, Germany",
    period: "August 2024 - Present",
    link: "https://ergosign.de/de/",
  },
  {
    position: "Programming II and Precourse Tutor",
    company: "University of Saarland",
    location: "Saarbrücken, Germany",
    period: "Summer terms 2023 and 2024",
  },
];

export default function About() {
  return (
    <>
      <Section name="about" title="About me" subtitle="What I'm Doing Now">
        <div className={"grid items-start gap-6 md:grid-cols-2"}>
          <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-6">
            {KeywordList.map((keyword, index) => (
              <div
                key={keyword}
                className="animate-enter"
                style={{ animationDelay: getAnimationDelay(2 + index / 4) }}
              >
                <Keyword>{keyword}</Keyword>
              </div>
            ))}
          </div>
          <VStack>
            <p
              className="animate-enter leading-relaxed"
              style={{ animationDelay: getAnimationDelay(2) }}
            >
              Full-stack software engineer with a strong foundation in
              JavaScript, and TypeScript, mainly interested in user interfaces
              and user experiences, and artificial intelligence.
            </p>
            <p
              className="animate-enter leading-relaxed"
              style={{
                animationDelay: getAnimationDelay(
                  2 + KeywordList.length / 4 / 2,
                ),
              }}
            >
              Skilled in building scalable solutions across diverse tech stacks,
              including Next.js, Supabase, and Tailwind CSS, with a keen
              interest in privacy-focused and developer-centric tools.
            </p>
          </VStack>
        </div>
      </Section>
      <Section
        size="small"
        headerAlign="left"
        name="career"
        title="Career"
        animationIndex={2 + KeywordList.length / 4}
      >
        <VStack className="items-start gap-8">
          {career.map((job, index) => (
            <VStack
              className="animate-enter items-start gap-2"
              key={index}
              style={{
                animationDelay: getAnimationDelay(
                  3 + KeywordList.length / 4 + index,
                ),
              }}
            >
              <h4 className="mb-0">{job.position}</h4>
              <div className="flex">
                {job.link ? (
                  <Link href={job.link} target="_blank">
                    <Button variant="link">{job.company}</Button>
                  </Link>
                ) : (
                  <span>{job.company}</span>
                )}
                <Dot />
                {job.location}
              </div>
              <div className="flex">{job.period}</div>
            </VStack>
          ))}
        </VStack>
      </Section>
    </>
  );
}
