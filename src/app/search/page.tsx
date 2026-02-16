import { getAllPosts, getPostBySlug } from "@/lib/posts";
import SearchPageClient from "./SearchPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "検索",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const posts = getAllPosts();
  const { q } = await searchParams;

  const postsWithContent = posts.map((post) => {
    const full = getPostBySlug(post.slug);
    return { ...post, content: full?.content ?? "" };
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <SearchPageClient posts={postsWithContent} initialQuery={q ?? ""} />
    </div>
  );
}
