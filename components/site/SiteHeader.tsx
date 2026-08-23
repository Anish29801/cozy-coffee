"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Story" },
  { href: "/journal", label: "Journal" },
  { href: "/visit", label: "Visit" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-[20px] sm:text-[22px] font-semibold tracking-tight text-espresso">
            Cozy
          </span>
          <span className="font-hand text-[18px] sm:text-[20px] text-clay -ml-1">Coffee</span>
          <span className="hidden sm:inline text-[11px] tracking-[0.18em] uppercase text-espresso/50 ml-2">
            neighborhood living room
          </span>
        </Link>

        {/* desktop nav */}
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

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/reserve" className="hidden sm:inline-flex">
            <Button size="sm">Reserve a table</Button>
          </Link>
          {/* mobile hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-espresso hover:bg-fog transition-colors"
          >
            <span className="sr-only">Menu</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6 L18 18 M18 6 L6 18" />
              ) : (
                <path d="M4 7 H20 M4 12 H20 M4 17 H20" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      {open && (
        <div className="md:hidden border-t bg-cream shadow-warm">
          <nav className="mx-auto max-w-6xl px-4 py-3 grid gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[12px] px-4 py-3 text-[15px] font-medium text-espresso hover:bg-fog transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/reserve" onClick={() => setOpen(false)} className="mt-2">
              <Button className="w-full">Reserve a table</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
