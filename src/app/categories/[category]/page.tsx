import { getAllCategories, getPostsByCategory, getAllTags } from "@/lib/posts";
import PostList from "@/components/PostList";
import CategoryList from "@/components/CategoryList";
import TagList from "@/components/TagList";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return {
    title: `${decoded} の記事一覧`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const posts = getPostsByCategory(decoded);
  const allCategories = getAllCategories();
  const allTags = getAllTags();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-xl font-semibold">
        <span style={{ color: "var(--color-accent)" }}>{decoded}</span>
        <span style={{ color: "var(--color-text-secondary)" }}> の記事</span>
      </h1>
      <section className="mb-4">
        <CategoryList categories={allCategories} activeCategory={decoded} />
      </section>
      <section className="mb-8">
        <TagList tags={allTags} />
      </section>
      <section>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
