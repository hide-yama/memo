import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="py-12 text-center text-sm" style={{ color: "var(--color-text-tertiary)" }}>
        記事がありません
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
