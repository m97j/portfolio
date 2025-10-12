"use client";
import { useEffect, useState } from "react";
import { mdToHtml } from "@/lib/markdown";

export default function MarkdownRenderer({ source }: { source: string }) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    (async () => setHtml(await mdToHtml(source)))();
  }, [source]);

  return <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />;
}