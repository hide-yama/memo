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
- 本文: 約15px（0.9375rem）、行間1.8倍
- ウェイト: 400（通常）と 600（ボールド）

### レイアウト
- 記事本文幅: max-w-2xl（約640px）
- 全体幅: max-w-4xl
- 記事一覧: スマホ1カラム / デスクトップ(sm以上)2カラム
- サムネイル比率: 3:2（1536x1024px）
- 十分な余白で読みやすさを重視

## ディレクトリ構成
```
content/posts/           # Markdown記事ファイル
public/images/posts/     # 記事用サムネイル画像（{slug}.png）
src/
├── app/
│   ├── layout.tsx       # ルートレイアウト
│   ├── page.tsx         # ホームページ（記事一覧）
│   ├── globals.css      # Tailwind設定
│   ├── posts/[slug]/page.tsx          # 記事詳細
│   ├── categories/[category]/page.tsx # カテゴリ別一覧
│   ├── tags/[tag]/page.tsx            # タグ別一覧
│   ├── search/
│   │   ├── page.tsx             # 検索ページ（サーバー）
│   │   └── SearchPageClient.tsx # 検索UI（クライアント）
│   ├── preview/page.tsx         # プレビューページ（パスワード認証）
│   └── api/
│       ├── revalidate/route.ts  # Vercel cron用リビルドAPI
│       └── preview/route.ts     # プレビュー認証API
├── components/
│   ├── PostCard.tsx      # 記事カード（サムネイル付き）
│   ├── PostList.tsx      # 記事一覧グリッド
│   ├── CategoryList.tsx  # カテゴリナビゲーション
│   └── TagList.tsx       # タグナビゲーション（横スクロール）
└── lib/
    ├── posts.ts          # 記事読み込み・クエリ
    └── markdownToHtml.ts # Markdown→HTML変換（話者名後の改行処理含む）
```

## 記事フォーマット（frontmatter）
```yaml
title: "記事タイトル"
date: "2026-02-13"
description: "記事の概要"
tags: ["節約", "家計管理"]
category: "暮らしとお金"
published: true
```

## 命名規則
- 記事ファイル名 = slug（英語、ケバブケース）例: `interest-rate-is-not-meat.md`
- サムネイル画像は `public/images/posts/{slug}.png` に配置で自動検出
- スラッグは一度決めたら変更しない（URLの安定性のため）

## 機能一覧

### カテゴリ分け
- frontmatterの `category` フィールドで大分類
- タグ = 記事内の細かい分類、カテゴリ = ジャンルの大分類
- `/categories/{category}` でカテゴリ別一覧

### 公開日スケジューリング
- `date` が未来の記事はビルド時に自動で非表示
- Vercel cronで毎日 JST 0:00（UTC 15:00）にリビルド
- `vercel.json` で設定済み

### プレビューモード
- `/preview` でパスワード認証後、未来記事を含む全記事を表示
- 未来記事には「公開予定」バッジ表示
- パスワードは環境変数 `PREVIEW_PASSWORD` で設定（デフォルト: `preview`）
- Vercelにも `PREVIEW_PASSWORD` 環境変数の設定が必要

### サムネイル
- `public/images/posts/{slug}.{png,jpg,jpeg,webp}` を自動検出
- 画像がない記事はグレー背景に薄い「memo」テキストのプレースホルダー
- 記事一覧カード・記事詳細ページ両方に表示

### 話者名の改行処理
- Markdown内の `**名前：**` パターンの後に自動で改行を挿入
- `markdownToHtml.ts` で処理

## コマンド
- `npm run dev` - 開発サーバー起動
- `npm run build` - 静的ビルド
- `npm run start` - 本番サーバー起動
- `npm run lint` - ESLint実行

## 注意事項
- 記事は `content/posts/` にMarkdownファイルとして配置（ファイル名がslugになる）
- `published: false` の記事は一覧に表示されない
- 検索はクライアントサイドフィルタリング（タイトル・説明・タグ・カテゴリを対象）
- **日本語パスの制約**: プロジェクトディレクトリが日本語パスにあるため、Turbopack（Next.js 16デフォルト）は使用不可。Next.js 15（Webpack）を使用すること
- **ビルドキャッシュ**: 新しいページやAPIルートを追加した後にランタイムエラーが出る場合は `.next` を削除して再起動

---

## 更新履歴 & アップグレード候補

→ **[UPGRADES.md](./UPGRADES.md)** で一元管理
