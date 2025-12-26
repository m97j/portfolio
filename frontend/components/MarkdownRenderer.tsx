// frontend/components/MarkdownRenderer.tsx
"use client";
import React from "react"
import ReactMarkdown from "react-markdown"

// remark plugins
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import remarkToc from "remark-toc"
import remarkYoutube from "@/lib/remark-youtube"

// rehype plugins
import rehypeKatex from "rehype-katex"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

// custom mermaid renderer 
import MermaidRenderer from "./MermaidRenderer";

// styles
import "katex/dist/katex.min.css"
import "highlight.js/styles/github-dark.css"

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          remarkMath,
          remarkFrontmatter,
          remarkMdxFrontmatter,
          remarkToc,
          remarkYoutube
        ]}
        rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (match?.[1] === "mermaid") {
              return <MermaidRenderer code={String(children)} />;
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          iframe({ node, src, width, height, allow, allowFullScreen }) {
            return (
              <iframe
                src={src}
                width={width}
                height={height}
                style={{ border: "none" }}
                allow={allow}
                allowFullScreen={allowFullScreen}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
