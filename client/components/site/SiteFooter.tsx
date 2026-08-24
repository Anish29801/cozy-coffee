'use client';

import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/api";

export function SiteFooter() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "");
    const company = String(data.get("company") || "");

    if (!email || company.length > 0) return;

    setStatus("loading");
    try {
      await api.newsletter.subscribe({ email });
      setStatus("success");
      setMsg("Welcome — you're in.");
      form.reset();
    } catch {
      setStatus("error");
      setMsg("Couldn't join — try again later");
    }
  }

  return (
    <footer className="border-t bg-fog/50 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-semibold text-espresso">Cozy</span>
              <span className="font-hand text-lg text-clay">Coffee</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-espresso/60 max-w-xs">
              Your usual table is waiting. Friendly, warm, and always together.
              <br />
              <span className="font-hand text-base text-espresso/80">123 Warmth Lane · Open daily 7am</span>
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-espresso/50">Hours</p>
            <p className="mt-3 text-sm text-espresso/70">
              Mon–Fri 7am–7pm
              <br />
              Sat–Sun 8am–6pm
            </p>
            <p className="mt-4 text-xs tracking-[0.16em] uppercase text-espresso/50">Find us</p>
            <p className="mt-2 text-sm text-espresso/70">Instagram · Maps · hello@cozy.coffee</p>
          </div>

          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-espresso/50">Stay warm</p>
            <p className="mt-3 text-sm text-espresso/60">Newsletter — slow letters, no spam.</p>
            <form className="mt-3 flex gap-2" onSubmit={handleSubscribe}>
              <input
                name="email"
                type="email"
                required
                placeholder="you@youremail.com"
                className="flex-1 rounded-full border bg-white px-4 py-2 text-sm placeholder:text-espresso/40 focus:outline-none focus:ring-2 focus:ring-clay"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full bg-clay px-5 py-2 text-sm font-medium text-white hover:bg-espresso transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "…" : "Join"}
              </button>
              <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
            </form>
            {msg && (
              <p className={`mt-2 text-xs ${status === "success" ? "text-moss" : "text-clay"}`}>{msg}</p>
            )}
            <p className="mt-6 text-xs text-espresso/40">© {new Date().getFullYear()} Cozy Coffee. Made with warmth.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-xs text-espresso/40">
          <Link href="/menu" className="hover:text-espresso">
            Menu
          </Link>
          <Link href="/story" className="hover:text-espresso">
            Story
          </Link>
          <Link href="/journal" className="hover:text-espresso">
            Journal
          </Link>
          <Link href="/visit" className="hover:text-espresso">
            Visit
          </Link>
        </div>
      </div>
    </footer>
  );
}
