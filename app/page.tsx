import { HeroEditorial } from "@/components/site/HeroEditorial";
import { EthosStrip } from "@/components/site/EthosStrip";
import { MenuBoard } from "@/components/site/MenuBoard";
import { Testimonials } from "@/components/site/Testimonials";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getJournal } from "@/lib/content";

export default function Home() {
  const journals = getJournal().slice(0, 2);

  return (
    <>
      <HeroEditorial />
      <EthosStrip />
      <MenuBoard />

      {/* Story tease */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] items-center">
          <div className="aspect-[4/3] rounded-[24px] border bg-fog shadow-warm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cream to-wood/15" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80&auto=format&fit=crop"
              alt="Barista pouring coffee"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-clay">Our story</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-espresso">
              The bell, the wood, the neighbors
            </h2>
            <p className="mt-3 text-[17px] leading-7 text-espresso/70">
              We opened with one table and two chairs. Now the room is full, but the feeling is the same â€”
              slow mornings, warm light, and a barista who remembers if you take it black.
            </p>
            <Link href="/story" className="mt-6 inline-flex">
              <Button variant="secondary">Read our story</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community + Journal */}
      <section className="border-y bg-fog/20 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-clay">Together</p>
              <h2 className="font-display text-3xl font-semibold text-espresso">Community wall</h2>
            </div>
            <Link href="/journal" className="hidden md:inline-flex text-sm font-medium text-clay hover:text-espresso">
              Visit journal â†’
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {journals.map((post) => (
              <div key={post.slug} className="rounded-[24px] border bg-white p-6 shadow-warm">
                <p className="text-xs tracking-[0.16em] uppercase text-moss">{post.date} Â· {post.author}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-espresso">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-espresso/60">{post.excerpt}</p>
                <Link href={`/journal/${post.slug}`} className="mt-4 inline-flex text-sm font-medium text-clay hover:text-espresso">
                  Read â†’
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Visit */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="rounded-[24px] border bg-espresso text-cream p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-warm">
          <div>
            <h2 className="font-display text-3xl font-semibold">Your usual table is waiting</h2>
            <p className="mt-2 font-hand text-xl text-gold">Open daily Â· 123 Warmth Lane Â· hello@cozy.coffee</p>
            <p className="mt-2 text-sm text-cream/70">Monâ€“Fri 7amâ€“7pm Â· Satâ€“Sun 8amâ€“6pm Â· Dogs welcome</p>
          </div>
          <Link href="/visit">
            <Button size="lg" variant="secondary" className="bg-cream text-espresso hover:bg-white">
              Visit us
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
