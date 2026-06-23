"use client";

import Link from "next/link";
import VStack from "./VStack";
import { useState } from "react";
import { Card, CardHoverEffect } from "./card-hover-effect";
import { CardContent, CardDescription } from "./ui/card";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { getAnimationDelay } from "./Section";

export type BlogPostSummary = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly publishedAt: string;
};

const BlogPosts = ({ posts }: { posts: readonly BlogPostSummary[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <VStack>
      {posts.map((post, index) => (
        <Link
          href={`/blog/${post.slug}`}
          key={post.slug}
          className="motion-safe:animate-appear motion-reduce:animate-appear-reduced"
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
                    <h3>{post.title}</h3>
                    <CardDescription>{post.summary}</CardDescription>
                  </div>
                  <span>
                    {format(post.publishedAt, "dd.MM.yyyy", {
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
