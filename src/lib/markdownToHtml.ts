import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "github-light",
      keepBackground: true,
    })
    .use(rehypeStringify)
    .process(markdown);

  // 話者名（**名前：**）の後に改行を挿入
  const html = result
    .toString()
    .replace(/<strong>([^<]+[：:])<\/strong>\s*/g, "<strong>$1</strong><br>");

  return html;
}
