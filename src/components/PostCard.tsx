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

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article
      className="group overflow-hidden rounded-lg border bg-white transition-colors hover:bg-[var(--color-bg-secondary)]"
      style={{ borderColor: "var(--color-border)" }}
    >
      <Link href={`/posts/${post.slug}`} className="block">
        {/* サムネイル */}
        <div className="aspect-[16/9] overflow-hidden bg-[#f0f2f4]">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt=""
              width={640}
              height={360}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="select-none text-2xl font-bold tracking-widest text-[#d8dce0]">
                memo
              </span>
            </div>
          )}
        </div>

        {/* コンテンツ */}
        <div className="p-3 sm:p-4">
          <h2
            className="line-clamp-2 text-sm font-semibold leading-snug sm:text-base"
            style={{ color: "var(--color-text)" }}
          >
            {post.title}
          </h2>
          <p
            className="mt-1.5 hidden line-clamp-2 text-sm leading-relaxed sm:block"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {post.description}
          </p>
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
  );
}
