import Link from "next/link";
import { getMenu } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";

export function MenuBoard() {
  const items = getMenu().slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-clay">The board</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-espresso">Signature, seasonal, slow</h2>
          <p className="mt-2 font-hand text-xl text-espresso/50">Pinned this week â€” handwritten, as it should be</p>
        </div>
        <Link href="/menu" className="hidden md:inline-flex text-sm font-medium text-clay hover:text-espresso">
          View full menu â†’
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.slug} className="overflow-hidden bg-white">
            {item.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.title} className="h-36 w-full object-cover" />
            )}
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <h3 className="font-display text-lg font-semibold leading-tight text-espresso">{item.title}</h3>
                <span className="rounded-full border bg-fog px-3 py-1 text-xs font-medium text-espresso">{item.price}</span>
              </div>
              <p className="mt-1 text-xs tracking-[0.16em] uppercase text-moss">{item.category}</p>
              {item.story && <p className="mt-3 text-sm leading-6 text-espresso/60">{item.story}</p>}
              <p className="mt-4 font-hand text-sm text-clay">â€” with love, since 2018</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 md:hidden">
        <Link href="/menu" className="text-sm font-medium text-clay">
          View full menu â†’
        </Link>
      </div>

      <div className="mt-8 rounded-[16px] border border-dashed bg-cream p-4 text-sm text-espresso/60">
        <span className="font-medium text-espresso">Seasonal note:</span> Ethiopia Guji on espresso + filter. Oat steamed slow. Ask about our sourdough â€” 48h ferment, 5am bake.
      </div>
    </section>
  );
}
