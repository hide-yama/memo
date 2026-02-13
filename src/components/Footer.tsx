export default function Footer() {
  return (
    <footer className="border-t py-8" style={{ borderColor: "var(--color-border)" }}>
      <div className="mx-auto max-w-4xl px-4 text-center text-sm" style={{ color: "var(--color-text-tertiary)" }}>
        &copy; {new Date().getFullYear()} My Blog. All rights reserved.
      </div>
    </footer>
  );
}
