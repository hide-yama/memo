import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");
const imagesDirectory = path.join(process.cwd(), "public/images/posts");

const imageExtensions = [".png", ".jpg", ".jpeg", ".webp"];

function findThumbnail(slug: string): string | null {
  for (const ext of imageExtensions) {
    if (fs.existsSync(path.join(imagesDirectory, `${slug}${ext}`))) {
      return `/images/posts/${slug}${ext}`;
    }
  }
  return null;
}

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  thumbnail: string | null;
  published: boolean;
};

export type Post = PostMeta & {
  content: string;
};

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory);

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title ?? "",
        date: data.date ?? "",
        description: data.description ?? "",
        tags: data.tags ?? [],
        category: data.category ?? "",
        thumbnail: findThumbnail(slug),
        published: data.published ?? false,
      } satisfies PostMeta;
    })
    .filter((post) => post.published)
    .filter((post) => new Date(post.date) <= new Date())
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
    category: data.category ?? "",
    thumbnail: findThumbnail(slug),
    published: data.published ?? false,
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categorySet = new Set<string>();
  posts.forEach((post) => {
    if (post.category) categorySet.add(post.category);
  });
  return Array.from(categorySet).sort();
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}
