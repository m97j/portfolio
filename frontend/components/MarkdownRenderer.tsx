// frontend/components/MarkdownRenderer.tsx
"use client";
import React from "react";
import ReactMarkdown from "react-markdown";

// remark plugins
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkToc from "remark-toc";
import remarkOembed from "@remark-embedder/core"

// rehype plugins
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings"

// styles
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css"

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkFrontmatter, remarkMdxFrontmatter, remarkToc, remarkOembed]}
        rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
