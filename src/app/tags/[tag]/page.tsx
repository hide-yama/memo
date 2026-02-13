import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostList from "@/components/PostList";
import TagList from "@/components/TagList";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `${decoded} の記事一覧`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  const allTags = getAllTags();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-xl font-semibold">
        <span style={{ color: "var(--color-accent)" }}>{decoded}</span>
        <span style={{ color: "var(--color-text-secondary)" }}> の記事</span>
      </h1>
      <section className="mb-8">
        <TagList tags={allTags} activeTag={decoded} />
      </section>
      <section>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
