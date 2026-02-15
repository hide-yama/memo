import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdownToHtml";
import TagList from "@/components/TagList";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
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
          <time className="mt-3 block text-sm" style={{ color: "var(--color-text-tertiary)" }}>
            {formatDate(post.date)}
          </time>
        </header>

        <div
          className="prose mx-auto max-w-2xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <footer className="mt-12 border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
          <TagList tags={post.tags} />
        </footer>
        </div>
      </article>
    </div>
  );
}
