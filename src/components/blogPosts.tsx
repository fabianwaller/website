"use client";

import Link from "next/link";
import VStack from "./VStack";
import { useState } from "react";
import { Card, CardHoverEffect } from "./card-hover-effect";
import { useBlogPosts } from "@/provider/BlogPostsContext";
import { CardContent, CardDescription } from "./ui/card";
import { getAnimationDelay } from "./Section";

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const BlogPosts = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { blogPosts } = useBlogPosts();

  return (
    <VStack>
      {blogPosts.map((post, index) => (
        <Link
          href={`/blog/${post.slug}`}
          key={post.slug}
          className="motion-reduce:animate-appear-reduced motion-safe:animate-appear"
          style={{ animationDelay: getAnimationDelay(3 + index) }}
        >
          <div
            className="relative block h-full w-full"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <CardHoverEffect
              active={hoveredIndex === index}
              className="-left-4 w-full-plus"
            />
            <Card>
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3>{post.metadata.title}</h3>
                    <CardDescription>{post.metadata.summary}</CardDescription>
                  </div>
                  <span>
                    {dateFormatter.format(new Date(post.metadata.publishedAt))}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </Link>
      ))}
    </VStack>
  );
};

export default BlogPosts;
