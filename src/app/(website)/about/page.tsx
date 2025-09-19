import EnterAnimated from "@/components/EnterAnimation";
import Section from "@/components/Section";

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

export default function About() {
  return (
    <Section name="about" title="About me" subtitle="What I'm Doing Now">
      <div className={"grid items-start gap-6 md:grid-cols-2"}>
        <div className="flex flex-wrap items-center justify-start gap-2">
          {KeywordList.map((keyword, index) => (
            <EnterAnimated key={keyword} index={index} type="fast">
              <Keyword>{keyword}</Keyword>
            </EnterAnimated>
          ))}
        </div>
        <div>
          <EnterAnimated>
            <p className="leading-relaxed">
              Full-stack software engineer with a strong foundation in
              JavaScript, and TypeScript, mainly interested in user interfaces
              and user experiences, and artificial intelligence. Skilled in
              building scalable solutions across diverse tech stacks, including
              Next.js, Supabase, and Tailwind CSS, with a keen interest in
              privacy-focused and developer-centric tools.
            </p>
          </EnterAnimated>
        </div>
      </div>
    </Section>
  );
}
