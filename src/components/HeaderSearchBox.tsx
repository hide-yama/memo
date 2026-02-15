"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderSearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/search");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-3 sm:mx-4">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
          placeholder="キーワードで検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border bg-[var(--color-bg-secondary)] py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:bg-white"
          style={{ borderColor: "var(--color-border)" }}
        />
      </div>
    </form>
  );
}
