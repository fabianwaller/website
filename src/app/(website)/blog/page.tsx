import BlogPosts from "@/components/blogPosts";
import EnterAnimated from "@/components/EnterAnimation";
import Section from "@/components/Section";
import VStack from "@/components/VStack";

const Blog: React.FC = () => {
  return (
    <Section
      name="blog"
      title="Personal Blog"
      subtitle="insight in my thoughts"
    >
      <VStack>
        <EnterAnimated>
          <p className="leading-relaxed">
            Here you&apos;ll find all my public thoughts, notes, learnings and
            experiences. I share whatever I want, ranging from programming to
            math, over books and podcasts and much more. Scroll down to check
            them out!
          </p>
        </EnterAnimated>
        <BlogPosts />
      </VStack>
    </Section>
  );
};

export default Blog;
