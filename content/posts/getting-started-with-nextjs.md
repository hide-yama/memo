---
title: "Next.jsで始めるモダンWeb開発"
date: "2026-02-13"
description: "Next.jsの基本的な機能と、App Routerを使ったWebアプリケーション開発の始め方を解説します。"
tags: ["Next.js", "React", "TypeScript"]
published: true
---

## はじめに

Next.jsは、Reactベースのフルスタックフレームワークです。サーバーサイドレンダリング（SSR）、静的サイト生成（SSG）、APIルートなど、モダンなWeb開発に必要な機能が最初から揃っています。

この記事では、Next.jsの基本的な機能と、App Routerを使った開発の始め方を紹介します。

## App Routerとは

Next.js 13から導入されたApp Routerは、ファイルベースのルーティングシステムです。`app`ディレクトリ内のフォルダ構造がそのままURLのパスになります。

```typescript
// app/page.tsx → /
// app/about/page.tsx → /about
// app/posts/[slug]/page.tsx → /posts/hello-world

export default function Page() {
  return <h1>Hello, Next.js!</h1>;
}
```

## サーバーコンポーネントとクライアントコンポーネント

App Routerでは、デフォルトですべてのコンポーネントがサーバーコンポーネントとして扱われます。クライアント側のインタラクティブな機能が必要な場合は、`"use client"`ディレクティブを使います。

```typescript
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      クリック回数: {count}
    </button>
  );
}
```

## データフェッチング

サーバーコンポーネントでは、`async/await`を使って直接データを取得できます。

```typescript
async function getPosts() {
  const res = await fetch("https://api.example.com/posts");
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## まとめ

Next.jsのApp Routerは、直感的なファイルベースルーティングとサーバーコンポーネントによって、パフォーマンスの高いWebアプリケーションを効率よく構築できます。TypeScriptとの相性も良く、型安全な開発が可能です。

次回は、Tailwind CSSとの組み合わせや、Markdownを使ったブログの構築方法を紹介します。
