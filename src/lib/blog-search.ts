import type { SerializedSearchIndex } from "@fabianwaller/document-search";

export type BlogSearchDocument = {
  readonly slug: string;
  readonly title: string;
};

export type BlogSearchData = SerializedSearchIndex<BlogSearchDocument>;
