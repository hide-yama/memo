import Link from "next/link";

type Props = {
  categories: string[];
  activeCategory?: string;
};

export default function CategoryList({ categories, activeCategory }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link
          key={category}
          href={`/categories/${encodeURIComponent(category)}`}
          className="rounded-full border px-3 py-1 text-sm font-medium transition-colors"
          style={{
            borderColor: activeCategory === category ? "var(--color-accent)" : "var(--color-border)",
            color: activeCategory === category ? "#fff" : "var(--color-text-secondary)",
            backgroundColor: activeCategory === category ? "var(--color-accent)" : "transparent",
          }}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
