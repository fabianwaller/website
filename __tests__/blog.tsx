import Blog from "@/app/(website)/blog/page";
import type { BlogPost } from "@/app/(website)/blog/utils";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

const blogPostsMock: BlogPost[] = [
  {
    metadata: {
      title: "Title",
      publishedAt: "2024-10-02",
      summary: "summary",
      image: "",
    },
    slug: "slug1",
    content: "content",
  },
  {
    metadata: {
      title: "Title",
      publishedAt: "2024-10-02",
      summary: "summary",
      image: "",
    },
    slug: "slug2",
    content: "content",
  },
];

jest.mock("@/app/(website)/blog/utils", () => ({
  getBlogPosts: () => blogPostsMock,
}));

describe("Blog", () => {
  it("renders blog page unchanged", () => {
    const component = render(<Blog />);
    expect(component.asFragment()).toMatchSnapshot();
  });
});
