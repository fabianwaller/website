import "server-only";

import generatedBlogSearchData from "@/generated/blog-search-data.json";

import type { BlogSearchData } from "./blog-search";

export const blogSearchData =
  generatedBlogSearchData as unknown as BlogSearchData;
