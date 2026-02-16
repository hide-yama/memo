import type { PostMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";

type SearchablePost = PostMeta & { content: string };

export default function SearchPageClient({
  posts,
  initialQuery = "",
}: {
  posts: SearchablePost[];
  initialQuery?: string;
}) {
  const query = initialQuery;

  const filtered = query.trim()
    ? posts.filter((post) => {
        const q = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          post.category.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div>
      {query.trim() === "" ? (
        <p className="py-12 text-center text-sm" style={{ color: "var(--color-text-tertiary)" }}>
          ヘッダーの検索バーからキーワードを入力してください
        </p>
      ) : filtered.length === 0 ? (
        <p className="py-12 text-center text-sm" style={{ color: "var(--color-text-tertiary)" }}>
          「{query}」に一致する記事が見つかりませんでした
        </p>
      ) : (
        <>
          <p className="mb-4 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            「{query}」の検索結果（{filtered.length}件）
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
