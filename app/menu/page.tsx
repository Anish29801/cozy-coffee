import type { Metadata } from "next";
import { getMenu } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Menu — Cozy Coffee Café",
  description: "Board-style, seasonal, handwritten — espresso, filter, pastries, lunch",
};

const categoryOrder = ["Espresso", "Filter", "Pastries", "Lunch", "Seasonal"] as const;

export default function MenuPage() {
  const items = getMenu();
  const grouped = categoryOrder
    .map((cat) => ({ cat, items: items.filter((i) => i.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.18em] uppercase text-clay">The board</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-espresso">Menu</h1>
        <p className="mt-3 font-hand text-xl text-espresso/60">Pinned today — whatever tastes best right now</p>
        <p className="mt-4 text-sm leading-6 text-espresso/60">
          Seasonal, slow, small. We change the board when the beans tell us to. Allergens noted — always ask, we remember.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {grouped.map((group) => (
          <section key={group.cat}>
            <div className="flex items-baseline gap-3">
              <h2 className="font-display text-2xl font-semibold text-espresso">{group.cat}</h2>
              <span className="h-px flex-1 max-w-[120px] bg-border" />
              <span className="text-xs tracking-[0.16em] uppercase text-espresso/40">{group.items.length} items</span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {group.items.map((item) => (
                <Card key={item.slug} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-lg font-semibold text-espresso leading-tight">{item.title}</h3>
                      <span className="shrink-0 rounded-full bg-clay px-3 py-1 text-xs font-semibold text-white">{item.price}</span>
                    </div>
                    {item.story && <p className="mt-3 text-sm leading-6 text-espresso/60">{item.story}</p>}
                    {item.allergens && (
                      <p className="mt-3 text-xs text-espresso/40">Contains: {item.allergens.join(", ")}</p>
                    )}
                    {item.seasonal && <span className="mt-3 inline-flex rounded-full bg-moss/10 px-2 py-1 text-xs text-moss">Seasonal</span>}
                    <p className="mt-4 font-hand text-sm text-clay">— {item.category} · made slow</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-[16px] border border-dashed bg-cream p-6">
        <p className="font-display font-semibold text-espresso">A note from the bar</p>
        <p className="mt-2 text-sm leading-6 text-espresso/60">
          Oat milk steamed at 62°C, dairy the same. Decaf? We have it — washed Colombia, no compromise. Pastries baked at 5am,
          sourdough is 48h ferment. Tell us how you like it and we&apos;ll remember next time.
        </p>
      </div>
    </div>
  );
}
