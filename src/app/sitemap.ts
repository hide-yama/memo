import type { MetadataRoute } from "next";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/posts";

const SITE_URL = "https://memo-umber-five.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/categories/${encodeURIComponent(cat)}`,
  }));

  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${SITE_URL}/tags/${encodeURIComponent(tag)}`,
  }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    ...postEntries,
    ...categoryEntries,
    ...tagEntries,
  ];
}
