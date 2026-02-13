import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white" style={{ borderColor: "var(--color-border)" }}>
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-semibold tracking-tight" style={{ color: "var(--color-text)" }}>
          My Blog
        </Link>
        <nav className="flex items-center gap-5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
          <Link href="/" className="transition-colors hover:text-[var(--color-text)]">
            ホーム
          </Link>
          <Link href="/search" className="transition-colors hover:text-[var(--color-text)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
