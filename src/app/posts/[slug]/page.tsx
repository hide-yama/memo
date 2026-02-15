import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getAdjacentPosts, getRelatedPosts } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdownToHtml";
import TagList from "@/components/TagList";
import PostCard from "@/components/PostCard";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

const SITE_URL = "https://memo-umber-five.vercel.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const ogImage = post.thumbnail
    ? `${SITE_URL}${post.thumbnail}`
    : `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const html = await markdownToHtml(post.content);
  const { prev, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug, post.tags);

  const ogImage = post.thumbnail
    ? `${SITE_URL}${post.thumbnail}`
    : `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    image: ogImage,
    author: {
      "@type": "Person",
      name: "memo",
    },
    publisher: {
      "@type": "Organization",
      name: "memo",
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: "var(--color-border)" }}>
        {post.thumbnail && (
          <div className="aspect-[3/2] overflow-hidden">
            <Image
              src={post.thumbnail}
              alt=""
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        )}
        <div className="p-6 sm:p-10">
        <header className="mb-8">
          <h1 className="text-xl font-semibold leading-tight sm:text-2xl" style={{ color: "var(--color-text)" }}>
            {post.title}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm" style={{ color: "var(--color-text-tertiary)" }}>
            <time>{formatDate(post.date)}</time>
            <span>{post.readingTime}分で読める</span>
          </div>
        </header>

        <div
          className="prose mx-auto max-w-2xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <footer className="mt-12 border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
          <TagList tags={post.tags} />
        </footer>

        {/* 前後ナビゲーション */}
        {(prev || next) && (
          <nav
            className="mt-8 grid grid-cols-2 gap-4 border-t pt-8"
            style={{ borderColor: "var(--color-border)" }}
          >
            {prev ? (
              <Link
                href={`/posts/${prev.slug}`}
                className="group rounded-lg border p-4 transition-colors hover:bg-[var(--color-bg-secondary)]"
                style={{ borderColor: "var(--color-border)" }}
              >
                <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>← 前の記事</span>
                <span className="mt-1 block text-sm font-medium leading-snug group-hover:underline" style={{ color: "var(--color-text)" }}>
                  {prev.title}
                </span>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/posts/${next.slug}`}
                className="group rounded-lg border p-4 text-right transition-colors hover:bg-[var(--color-bg-secondary)]"
                style={{ borderColor: "var(--color-border)" }}
              >
                <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>次の記事 →</span>
                <span className="mt-1 block text-sm font-medium leading-snug group-hover:underline" style={{ color: "var(--color-text)" }}>
                  {next.title}
                </span>
              </Link>
            ) : <div />}
          </nav>
        )}
        </div>
      </article>

      {/* 関連記事 */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-base font-semibold" style={{ color: "var(--color-text)" }}>
            関連記事
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {related.map((r) => (
              <PostCard key={r.slug} post={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
