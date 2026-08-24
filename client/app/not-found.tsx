import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border bg-fog px-4 py-1 text-xs tracking-[0.18em] uppercase text-espresso/60">
          <span className="h-2 w-2 rounded-full bg-clay animate-pulse" />
          404 — the room you looked for isn&apos;t poured yet
        </p>

        <h1 className="mt-6 font-display text-5xl md:text-6xl font-semibold tracking-tight text-espresso">
          Oops. The slow
          <span className="font-hand font-normal text-clay block text-6xl md:text-7xl -mt-2">table is empty.</span>
        </h1>

        <p className="mt-6 text-[17px] leading-7 text-espresso/60 max-w-xl mx-auto">
          Friendly, warm, and always together — but this page wandered off like foam art in the wind. Your usual table is
          still waiting, though. Let&apos;s get you back.
        </p>

        <div className="mx-auto mt-10 relative aspect-[4/2.5] max-w-md overflow-hidden rounded-[24px] border bg-fog shadow-warm">
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-fog to-wood/15" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <p className="font-display text-7xl font-semibold text-espresso/10">404</p>
            <p className="font-hand text-2xl text-clay -mt-2">“Not on the board today”</p>
            <p className="mt-3 text-xs tracking-[0.16em] uppercase text-espresso/40">Wood · linen · steam · together</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&auto=format&fit=crop"
            alt="Empty cozy cafe table"
            className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
          />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button size="lg">Back to the living room</Button>
          </Link>
          <Link
            href="/menu"
            className="inline-flex h-12 items-center rounded-full border bg-white px-8 text-sm font-medium text-espresso hover:bg-fog transition-colors"
          >
            See the menu
          </Link>
        </div>

        <div className="mt-8 flex justify-center gap-6 text-sm text-espresso/50">
          <Link href="/visit" className="hover:text-espresso">
            Visit
          </Link>
          <span className="text-border">·</span>
          <Link href="/journal" className="hover:text-espresso">
            Journal
          </Link>
          <span className="text-border">·</span>
          <Link href="/reserve" className="hover:text-espresso">
            Reserve
          </Link>
        </div>

        <p className="mt-10 font-hand text-lg text-espresso/30">psst — first sip tomorrow 7am is on us.</p>
      </div>
    </div>
  );
}
