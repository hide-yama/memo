import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group rounded-lg border bg-white transition-colors hover:bg-[var(--color-bg-secondary)]" style={{ borderColor: "var(--color-border)" }}>
      <Link href={`/posts/${post.slug}`} className="block p-5">
        <h2 className="text-lg font-semibold leading-snug" style={{ color: "var(--color-text)" }}>
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {post.description}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <time className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
            {formatDate(post.date)}
          </time>
          <div className="flex gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2 py-0.5 text-xs"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
