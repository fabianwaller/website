import BlogPosts from "@/components/blogPosts";
import Section, { getAnimationDelay } from "@/components/Section";
import VStack from "@/components/VStack";
import { getBlogPosts } from "./utils";

const Blog: React.FC = () => {
  const posts = getBlogPosts().map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    summary: post.metadata.summary,
    publishedAt: post.metadata.publishedAt,
  }));

  return (
    <Section
      name="blog"
      title="Personal Blog"
      subtitle="insight in my thoughts"
    >
      <VStack>
        {/* <p
          className="motion-reduce:animate-appear-reduced leading-relaxed motion-safe:animate-appear"
          style={{ animationDelay: getAnimationDelay(2) }}
        >
          Here you&apos;ll find all my public thoughts, notes, learnings and
          experiences. I share whatever I want, ranging from programming to
          math, over books and podcasts and much more. Scroll down to check them
          out!
        </p> */}
        <BlogPosts posts={posts} />
      </VStack>
    </Section>
  );
};

export default Blog;
