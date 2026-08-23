type GalleryItem = { src: string; alt: string; span?: string };

const items: GalleryItem[] = [
  { src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80&auto=format&fit=crop", alt: "Café interior" },
  { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop", alt: "Barista pour" },
  { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format&fit=crop", alt: "Wood table latte" },
  { src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop", alt: "Pastry board" },
  { src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80&auto=format&fit=crop", alt: "Coffee beans" },
  { src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=80&auto=format&fit=crop", alt: "Friends at table" },
];

export function GalleryMasonry() {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`relative overflow-hidden rounded-[16px] border bg-fog shadow-warm ${idx === 0 ? "md:row-span-2" : ""}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.alt} className="h-full w-full object-cover aspect-[4/3] md:aspect-auto md:h-full opacity-90" />
        </div>
      ))}
    </div>
  );
}
