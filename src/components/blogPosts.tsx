"use client";

import Link from "next/link";
import VStack from "./VStack";
import { useState } from "react";
import { Card, CardHoverEffect } from "./card-hover-effect";
import { useBlogPosts } from "@/provider/BlogPostsContext";
import { CardContent, CardDescription } from "./ui/card";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { getAnimationDelay } from "./Section";

const BlogPosts = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { blogPosts } = useBlogPosts();

  return (
    <VStack>
      {blogPosts.map((post, index) => (
        <Link
          href={`/blog/${post.slug}`}
          key={post.slug}
          className="animate-enter"
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
                    {format(post.metadata.publishedAt, "dd.MM.yyyy", {
                      locale: de,
                    })}
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
