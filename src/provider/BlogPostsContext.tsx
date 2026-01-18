"use client";

import { BlogPost } from "@/app/(website)/blog/utils";
import { createContext, useContext, ReactNode, useMemo } from "react";

interface BlogPostsContextProps {
  blogPosts: BlogPost[];
}

const BlogPostsContext = createContext<BlogPostsContextProps | undefined>(
  undefined,
);

export const BlogPostsProvider = ({
  children,
  blogPosts,
}: {
  children: ReactNode;
  blogPosts: BlogPost[];
}) => {
  const value = useMemo(() => ({ blogPosts }), [blogPosts]);

  return (
    <BlogPostsContext.Provider value={value}>
      {children}
    </BlogPostsContext.Provider>
  );
};

export const useBlogPosts = () => {
  const context = useContext(BlogPostsContext);
  if (!context) {
    throw new Error("useBlogPosts must be used within a BlogPostsProvider");
  }
  return context;
};
