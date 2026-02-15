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

export default function FeaturedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mb-8">
      <h2
        className="mb-4 text-base font-semibold"
        style={{ color: "var(--color-text)" }}
      >
        今週の注目記事
      </h2>
      <div className="mask-fade-right">
        <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
          {posts.map((post) => (
            <article key={post.slug} className="shrink-0 w-64 sm:w-72 group">
              <Link href={`/posts/${post.slug}`} className="block">
                <div className="aspect-[3/2] overflow-hidden rounded-lg bg-[#f0f2f4] transition-transform group-hover:scale-[1.02]">
                  {post.thumbnail ? (
                    <Image
                      src={post.thumbnail}
                      alt=""
                      width={576}
                      height={384}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="select-none text-2xl font-bold tracking-widest text-[#d8dce0]">
                        memo
                      </span>
                    </div>
                  )}
                </div>
                <h3
                  className="mt-2 text-sm font-semibold leading-snug line-clamp-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {post.title}
                </h3>
                <time
                  className="mt-1 block text-[11px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {formatDate(post.date)}
                </time>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
