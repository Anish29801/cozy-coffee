import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroEditorial() {
  return (
    <section className="relative overflow-hidden">
      {/* linen texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-center">
          {/* editorial copy */}
          <div className="relative">
            <p className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-clay">
              <span className="h-px w-8 bg-clay/40" />
              Since 2018 — Neighborhood living room
            </p>

            <h1 className="mt-4 font-display text-4xl md:text-[52px] font-semibold leading-[0.95] tracking-tight text-espresso">
              A warm hug
              <span className="font-hand font-normal text-clay text-5xl md:text-6xl block -mt-1">in every cup.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[17px] leading-7 text-espresso/70">
              Friendly, welcoming, and always together. Come for the pour-over, stay for the
              conversation. Your usual table is already waiting — wood, light, and a little steam.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/menu">
                <Button size="lg">See the menu</Button>
              </Link>
              <Link
                href="/visit"
                className="inline-flex h-12 items-center rounded-full border bg-white px-8 text-sm font-medium text-espresso hover:bg-fog transition-colors"
              >
                Find us
              </Link>
              <span className="font-hand text-lg text-espresso/50 ml-1">— open till 7pm today</span>
            </div>

            {/* marginalia */}
            <div className="hidden md:block absolute -right-6 top-10 text-xs leading-5 text-espresso/40">
              <p className="font-hand text-base text-clay">psst —</p>
              <p>
                Oat milk steamed slow.
                <br />
                Colombia + Ethiopia
                <br />
                this season.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-espresso/60">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-moss" /> 4.9 from 600+ neighbors
              </span>
              <span className="h-4 w-px bg-border" />
              <span>Served in ceramic, always</span>
            </div>
          </div>

          {/* image editorial */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border bg-fog shadow-warm">
              {/* placeholder — warm gradient + film grain */}
              <div className="absolute inset-0 bg-gradient-to-br from-cream via-fog to-wood/10" />
              <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[radial-gradient(ellipse_at_center,_rgba(60,36,21,0.25),transparent_60%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-espresso/30 to-transparent">
                <p className="font-hand text-2xl text-white">The slow bar, 7am</p>
                <p className="text-xs tracking-[0.16em] uppercase text-white/80">natural light · wood · together</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80&auto=format&fit=crop"
                alt="Warm café interior with wood table and coffee"
                className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-85"
              />
            </div>

            {/* floating card */}
            <div className="absolute -bottom-4 -left-4 hidden md:block rounded-[16px] border bg-white p-4 shadow-warm">
              <p className="text-xs tracking-[0.16em] uppercase text-espresso/40">Today&apos;s pour</p>
              <p className="font-display text-sm font-semibold text-espresso">Ethiopia Guji — washed</p>
              <p className="text-xs text-espresso/60">orange peel · brown sugar · 27s</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
