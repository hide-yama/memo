import Link from "next/link";

type Props = {
  tags: string[];
  activeTag?: string;
};

export default function TagList({ tags, activeTag }: Props) {
  const isAll = !activeTag;

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none">
      <Link
        href="/"
        className="shrink-0 rounded-full border px-3 py-1 text-sm transition-colors"
        style={{
          borderColor: isAll ? "var(--color-accent)" : "var(--color-border)",
          color: isAll ? "var(--color-accent)" : "var(--color-text-secondary)",
          backgroundColor: isAll ? "rgba(30, 123, 101, 0.06)" : "transparent",
        }}
      >
        すべて
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag)}`}
          className="shrink-0 rounded-full border px-3 py-1 text-sm transition-colors"
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
