import { Suspense } from "react";
import Link from "next/link";
import HeaderSearchBox from "./HeaderSearchBox";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white" style={{ borderColor: "var(--color-border)" }}>
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="shrink-0 text-xl font-semibold tracking-tight" style={{ color: "var(--color-text)" }}>
          memo
        </Link>
        <Suspense>
          <HeaderSearchBox />
        </Suspense>
        <nav className="flex shrink-0 items-center gap-5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
          <Link href="/" className="hidden sm:block transition-colors hover:text-[var(--color-text)]">
            ホーム
          </Link>
          <Link href="/search" className="hidden sm:block transition-colors hover:text-[var(--color-text)]">
            検索
          </Link>
        </nav>
      </div>
    </header>
  );
}
