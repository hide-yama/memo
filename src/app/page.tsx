import { getAllPosts, getAllTags } from "@/lib/posts";
import PostList from "@/components/PostList";
import TagList from "@/components/TagList";

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <section className="mb-8">
        <TagList tags={tags} />
      </section>
      <section>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
