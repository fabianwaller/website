import Link from "next/link";
import Image, { ImageProps } from "next/image";
import {
  MDXRemote,
  MDXRemoteProps,
  MDXRemoteSerializeResult,
} from "next-mdx-remote/rsc";
import React, { AnchorHTMLAttributes, ReactNode } from "react";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypePrettyCode from "rehype-pretty-code";
import CopyButton from "./anchorHeading";
import HStack from "./HStack";

interface TableData {
  headers: string[];
  rows: string[][];
}

function Table({ data }: { data: TableData }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  let href = props.href;

  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage({ className, ...props }: ImageProps) {
  return <Image className={`rounded-lg ${className ?? ""}`} {...props} />;
}

function slugify(str: ReactNode): string {
  return String(str ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: ReactNode }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      <HStack className="group relative gap-x-2 hover:-left-8">
        <CopyButton href={`#${slug}`} />
        {children}
      </HStack>,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: ({ children }: { children: ReactNode }) => (
    <p className="hyphens-auto text-justify leading-relaxed">{children}</p>
  ),
  Image: RoundedImage,
  a: CustomLink,
  // code: Code,
  Table,
};

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: false,
  theme: { dark: "github-dark-default", light: "github-light-default" },
};

export async function CustomMDX({ mdxSource }: Props) {
  const props: MDXRemoteProps = {
    source: mdxSource,
    components: components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkToc],
        rehypePlugins: [[rehypePrettyCode, options]],
      },
    },
  };
  return <MDXRemote {...props} />;
}
