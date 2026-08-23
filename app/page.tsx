import { HeroEditorial } from "@/components/site/HeroEditorial";
import { EthosStrip } from "@/components/site/EthosStrip";
import { MenuBoard } from "@/components/site/MenuBoard";
import { Testimonials } from "@/components/site/Testimonials";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getJournal } from "@/lib/content";
import { Reveal } from "@/components/site/TextureOverlay";

export default function Home() {
  const journals = getJournal().slice(0, 2);

  return (
    <>
      <HeroEditorial />
      <EthosStrip />
      <MenuBoard />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] items-center">
          <Reveal>
            <div className="aspect-[4/3] rounded-[24px] border bg-fog shadow-warm overflow-hidden relative hover:shadow-[0_16px_32px_rgba(60,36,21,0.10)] transition-shadow duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-cream to-wood/15" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80&auto=format&fit=crop"
                alt="Barista pouring coffee"
                className="absolute inset-0 h-full w-full object-cover opacity-80 hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-clay">Our story</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-espresso">
                The bell, the wood, the neighbors
              </h2>
              <p className="mt-3 text-[17px] leading-7 text-espresso/70">
                We opened with one table and two chairs. Now the room is full, but the feeling is the same — slow mornings,
                warm light, and a barista who remembers if you take it black.
              </p>
              <Link href="/story" className="mt-6 inline-flex">
                <Button variant="secondary">Read our story</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y bg-fog/20 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs tracking-[0.18em] uppercase text-clay">Together</p>
                <h2 className="font-display text-3xl font-semibold text-espresso">Community wall</h2>
              </div>
              <Link href="/journal" className="hidden md:inline-flex text-sm font-medium text-clay hover:text-espresso">
                Visit journal
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {journals.map((post, idx) => (
              <Reveal key={post.slug} delay={idx * 0.1}>
                <div className="rounded-[24px] border bg-white p-6 shadow-warm hover:shadow-[0_12px_32px_rgba(60,36,21,0.10)] hover:-translate-y-1 transition-all duration-500">
                  <p className="text-xs tracking-[0.16em] uppercase text-moss">
                    {post.date} · {post.author}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-espresso">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-espresso/60">{post.excerpt}</p>
                  <Link href={`/journal/${post.slug}`} className="mt-4 inline-flex text-sm font-medium text-clay hover:text-espresso">
                    Read
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <Reveal>
          <div className="rounded-[24px] border bg-espresso text-cream p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-warm hover:shadow-[0_16px_32px_rgba(60,36,21,0.20)] transition-shadow duration-500">
            <div>
              <h2 className="font-display text-3xl font-semibold">Your usual table is waiting</h2>
              <p className="mt-2 font-hand text-xl text-gold">Open daily · 123 Warmth Lane · hello@cozy.coffee</p>
              <p className="mt-2 text-sm text-cream/70">Mon–Fri 7am–7pm · Sat–Sun 8am–6pm · Dogs welcome</p>
            </div>
            <Link href="/visit">
              <Button size="lg" variant="secondary" className="bg-cream text-espresso hover:bg-white">
                Visit us
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
