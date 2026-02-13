# ブログサイト - プロジェクト概要

## 技術スタック
- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **Markdown処理**: gray-matter, unified, remark-parse, remark-rehype, rehype-stringify, rehype-pretty-code, shiki
- **フォント**: Noto Sans JP (next/font/google)
- **デプロイ先**: Vercel

## デザインコンセプト
noteライクなミニマルデザイン。「無色透明で邪魔にならない、コンテンツが主役」の思想。

### カラーパレット
- 背景: `#ffffff`（メイン）/ `#f5f8fa`（サブ）
- テキスト: `#08131a`（メイン）/ `rgba(8,19,26,0.66)`（サブ）
- アクセント: `#1e7b65`（ティールグリーン）

### タイポグラフィ
- 本文: 約18px、1行約35文字、行間1.5倍
- ウェイト: 400（通常）と 600（ボールド）

### レイアウト
- 記事本文幅: max-w-2xl（約640px）
- 全体幅: max-w-4xl
- 十分な余白で読みやすさを重視

## ディレクトリ構成
```
content/posts/           # Markdown記事ファイル
public/images/posts/     # 記事用画像
src/
├── app/
│   ├── layout.tsx       # ルートレイアウト
│   ├── page.tsx         # ホームページ（記事一覧）
│   ├── globals.css      # Tailwind設定
│   ├── posts/[slug]/page.tsx    # 記事詳細
│   ├── tags/[tag]/page.tsx      # タグ別一覧
│   └── search/
│       ├── page.tsx             # 検索ページ（サーバー）
│       └── SearchPageClient.tsx # 検索UI（クライアント）
├── components/          # 共通コンポーネント
└── lib/
    ├── posts.ts         # 記事読み込み・クエリ
    └── markdownToHtml.ts # Markdown→HTML変換
```

## 記事フォーマット（frontmatter）
```yaml
title: "記事タイトル"
date: "2026-02-13"
description: "記事の概要"
tags: ["Next.js", "TypeScript"]
published: true
```

## コマンド
- `npm run dev` - 開発サーバー起動
- `npm run build` - 静的ビルド
- `npm run start` - 本番サーバー起動
- `npm run lint` - ESLint実行

## 注意事項
- 記事は `content/posts/` にMarkdownファイルとして配置（ファイル名がslugになる）
- `published: false` の記事は一覧に表示されない
- 検索はクライアントサイドフィルタリング（タイトル・説明・タグを対象）
- **日本語パスの制約**: プロジェクトディレクトリが日本語パスにあるため、Turbopack（Next.js 16デフォルト）は使用不可。Next.js 15（Webpack）を使用すること
