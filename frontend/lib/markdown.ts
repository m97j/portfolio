// import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";

export async function mdToHtml(md: string) {
  const processed = await unified()
    .use(remarkMath)
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(md);
  return String(processed);
}
