"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function isScheduled(dateStr: string): boolean {
  return new Date(dateStr) > new Date();
}

export default function PreviewPage() {
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<PostMeta[] | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("パスワードが正しくありません");
      return;
    }

    const data = await res.json();
    setPosts(data.posts);
  }

  if (!posts) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20">
        <h1 className="mb-6 text-center text-lg font-semibold" style={{ color: "var(--color-text)" }}>
          プレビューモード
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="パスワードを入力"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border bg-white py-3 px-4 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
            style={{ borderColor: "var(--color-border)" }}
            autoFocus
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-lg py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            ログイン
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-lg font-semibold" style={{ color: "var(--color-text)" }}>
        プレビュー
        <span className="ml-2 text-sm font-normal" style={{ color: "var(--color-text-tertiary)" }}>
          （全{posts.length}記事）
        </span>
      </h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-lg border bg-white transition-colors hover:bg-[var(--color-bg-secondary)]"
            style={{ borderColor: "var(--color-border)" }}
          >
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="relative aspect-[3/2] overflow-hidden bg-[#f0f2f4]">
                {post.thumbnail ? (
                  <Image
                    src={post.thumbnail}
                    alt=""
                    width={640}
                    height={427}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="select-none text-2xl font-bold tracking-widest text-[#d8dce0]">
                      memo
                    </span>
                  </div>
                )}
                {isScheduled(post.date) && (
                  <span className="absolute top-2 right-2 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-medium text-white">
                    公開予定
                  </span>
                )}
              </div>
              <div className="p-3 sm:p-4">
                <h2
                  className="text-sm font-semibold leading-snug sm:text-base"
                  style={{ color: "var(--color-text)" }}
                >
                  {post.title}
                </h2>
                <div className="mt-2 flex items-center gap-2">
                  <time className="text-[11px] sm:text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                    {formatDate(post.date)}
                  </time>
                  {post.category && (
                    <span
                      className="text-[11px] font-medium sm:text-xs"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {post.category}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
