---
title: "Next.jsとMarkdownでブログを作る"
date: "2026-02-12"
description: "Markdownファイルを使ったブログサイトの構築方法を、コード例とともにステップバイステップで解説します。"
tags: ["Next.js", "Markdown", "ブログ"]
published: true
---

## なぜMarkdownでブログを書くのか

Markdownは、シンプルな記法でリッチなコンテンツを作成できる軽量マークアップ言語です。ブログの記事を書くのに最適な理由がいくつかあります。

1. **シンプルな記法** — HTMLを書く必要がない
2. **バージョン管理との相性** — Gitで記事の変更履歴を管理できる
3. **ポータビリティ** — プラットフォームに依存しない
4. **集中できる** — 装飾ではなくコンテンツに集中できる

## プロジェクト構成

Markdownファイルを`content/posts/`ディレクトリに配置し、Next.jsのビルド時に読み込んでHTMLに変換します。

```
content/
  posts/
    my-first-post.md
    my-second-post.md
src/
  lib/
    posts.ts          # 記事の読み込み
    markdownToHtml.ts  # Markdown→HTML変換
```

## Frontmatterでメタデータを管理

各Markdownファイルの先頭に、YAML形式のメタデータ（Frontmatter）を記述します。

```yaml
---
title: "記事のタイトル"
date: "2026-02-12"
description: "記事の概要をここに書きます"
tags: ["Next.js", "Markdown"]
published: true
---
```

`gray-matter`パッケージを使えば、このメタデータを簡単にパースできます。

## Markdown→HTML変換パイプライン

`unified`エコシステムを使って、Markdownを美しいHTMLに変換します。

```typescript
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, { theme: "github-light" })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
```

## シンタックスハイライト

`rehype-pretty-code`と`shiki`を組み合わせることで、コードブロックに美しいシンタックスハイライトを適用できます。VSCodeと同じハイライトエンジンを使っているため、見慣れた色合いでコードが表示されます。

## まとめ

MarkdownとNext.jsの組み合わせは、個人ブログに最適なソリューションです。コンテンツの管理がシンプルで、パフォーマンスも優れています。

ぜひ自分だけのブログを作ってみてください。
