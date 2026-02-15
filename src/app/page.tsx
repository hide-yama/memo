import { getAllPosts, getAllTags, getAllCategories } from "@/lib/posts";
import PostList from "@/components/PostList";
import TagList from "@/components/TagList";
import CategoryList from "@/components/CategoryList";
import FeaturedPosts from "@/components/FeaturedPosts";

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const categories = getAllCategories();
  const featuredPosts = posts.slice(0, 5);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <section className="mb-4">
        <CategoryList categories={categories} />
      </section>
      <section className="mb-8">
        <TagList tags={tags} />
      </section>
      <FeaturedPosts posts={featuredPosts} />
      <section>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
