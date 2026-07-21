import "server-only";

import generatedCommandSearchData from "@/generated/command-search-data.json";

import type { CommandSearchData } from "./command-search";

export const commandSearchData =
  generatedCommandSearchData as unknown as CommandSearchData;
