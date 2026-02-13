import { getAllPosts } from "@/lib/posts";
import SearchPageClient from "./SearchPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "検索",
};

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-xl font-semibold" style={{ color: "var(--color-text)" }}>
        記事を検索
      </h1>
      <SearchPageClient posts={posts} />
    </div>
  );
}
