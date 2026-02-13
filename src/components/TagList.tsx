import Link from "next/link";

type Props = {
  tags: string[];
  activeTag?: string;
};

export default function TagList({ tags, activeTag }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag)}`}
          className="rounded-full border px-3 py-1 text-sm transition-colors"
          style={{
            borderColor: activeTag === tag ? "var(--color-accent)" : "var(--color-border)",
            color: activeTag === tag ? "var(--color-accent)" : "var(--color-text-secondary)",
            backgroundColor: activeTag === tag ? "rgba(30, 123, 101, 0.06)" : "transparent",
          }}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
