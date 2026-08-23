import Link from "next/link";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Story" },
  { href: "/journal", label: "Journal" },
  { href: "/visit", label: "Visit" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-cream/80 backdrop-blur supports-[backdrop-filter]:bg-cream/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-[22px] font-semibold tracking-tight text-espresso">
            Cozy
          </span>
          <span className="font-hand text-[20px] text-clay -ml-1">Coffee</span>
          <span className="hidden sm:inline text-[11px] tracking-[0.18em] uppercase text-espresso/50 ml-2">
            neighborhood living room
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-espresso/80 hover:bg-fog hover:text-espresso transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/reserve" className="hidden sm:inline-flex">
            <Button size="sm">Reserve a table</Button>
          </Link>
          {/* mobile nav */}
          <div className="md:hidden flex items-center gap-1">
            {nav.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-espresso/70"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
