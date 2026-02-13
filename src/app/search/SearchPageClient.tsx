"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function SearchPageClient({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? posts.filter((post) => {
        const q = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text-tertiary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="記事を検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
          style={{ borderColor: "var(--color-border)" }}
          autoFocus
        />
      </div>

      <div className="mt-6">
        {query.trim() === "" ? (
          <p className="py-12 text-center text-sm" style={{ color: "var(--color-text-tertiary)" }}>
            キーワードを入力して記事を検索
          </p>
        ) : filtered.length === 0 ? (
          <p className="py-12 text-center text-sm" style={{ color: "var(--color-text-tertiary)" }}>
            「{query}」に一致する記事が見つかりませんでした
          </p>
        ) : (
          <div className="grid gap-4">
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
