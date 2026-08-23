import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Visit — Cozy Coffee Café",
  description: "Hours, map, amenities — 123 Warmth Lane, open daily. Your usual table is waiting.",
};

export default function VisitPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.18em] uppercase text-clay">Visit</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-espresso">Come linger</h1>
        <p className="mt-3 text-[17px] leading-7 text-espresso/70">123 Warmth Lane · hello@cozy.coffee · (555) 123-4567</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border bg-white p-6 shadow-warm">
          <h2 className="font-display text-xl font-semibold text-espresso">Hours</h2>
          <div className="mt-4 space-y-2 text-sm text-espresso/70">
            <div className="flex justify-between">
              <span>Mon–Fri</span>
              <span className="font-medium text-espresso">7am – 7pm</span>
            </div>
            <div className="flex justify-between">
              <span>Sat–Sun</span>
              <span className="font-medium text-espresso">8am – 6pm</span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xs tracking-[0.16em] uppercase text-espresso/40">Amenities</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-espresso/60">
              <li>• Dogs welcome</li>
              <li>• Kids + high chairs</li>
              <li>• WiFi — ask kindly</li>
              <li>• No outlets, slow table</li>
              <li>• Wheelchair access</li>
              <li>• Street parking</li>
            </ul>
          </div>
          <div className="mt-6 flex gap-3">
            <Link href="/reserve">
              <Button>Reserve</Button>
            </Link>
            <a
              href="https://maps.google.com/?q=123+Warmth+Lane"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-full border bg-white px-6 text-sm font-medium text-espresso hover:bg-fog"
            >
              Open in Maps
            </a>
          </div>
        </div>

        <div className="rounded-[24px] border bg-fog shadow-warm overflow-hidden">
          <div className="aspect-[4/3] relative bg-muted">
            <div className="absolute inset-0 bg-gradient-to-br from-cream via-fog to-wood/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-espresso text-cream px-5 py-3 text-sm shadow-warm">
                123 Warmth Lane · Your table here
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 rounded-[16px] border bg-white p-3 text-xs text-espresso/60">
              Google Maps embed → replace with &lt;iframe&gt; when you have API key. For MVP, link above works — no JS bloat.
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-display font-semibold text-espresso">How to linger</h3>
            <p className="mt-2 text-sm leading-6 text-espresso/60">
              Bring a book, bring a friend. The slow table has no outlet — on purpose. First sip together at 7am, daily. First
              time? Tell us your name, we&apos;ll remember.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[16px] border border-dashed bg-cream p-6">
        <h3 className="font-display font-semibold text-espresso">FAQs</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm text-espresso/60">
          <div>
            <p className="font-medium text-espresso">Do you take reservations?</p>
            <p className="mt-1">For 5+ or the slow table, yes. Others — just come.</p>
          </div>
          <div>
            <p className="font-medium text-espresso">Allergens?</p>
            <p className="mt-1">Noted on the board. Tell us — we remember.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
