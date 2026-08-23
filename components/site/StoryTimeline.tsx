type TimelineItem = {
  year: string;
  title: string;
  desc: string;
};

const timeline: TimelineItem[] = [
  { year: "2018", title: "One table, two chairs", desc: "We opened on Warmth Lane with a second-hand La Marzocco and a borrowed table. Regulars were neighbors first." },
  { year: "2020", title: "Together, apart", desc: "We left coffee on doorsteps. The room was quiet, but the bell still rang — you were still here." },
  { year: "2023", title: "The slow bar", desc: "We unplugged one table. No outlets, no rush. It became the most requested seat in the house." },
  { year: "2026", title: "Still your living room", desc: "More tables, same feeling — wood, light, and a barista who knows if you take it black." },
];

export function StoryTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border md:left-1/2" />
      <div className="space-y-8">
        {timeline.map((item, idx) => (
          <div key={item.year} className={`relative flex gap-6 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 h-9 w-9 rounded-full border bg-cream flex items-center justify-center shadow-warm text-xs font-semibold text-espresso">
              {item.year.slice(-2)}
            </div>
            <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}>
              <div className="rounded-[16px] border bg-white p-5 shadow-warm">
                <p className="font-hand text-lg text-clay">{item.year}</p>
                <h3 className="font-display text-lg font-semibold text-espresso">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-espresso/60">{item.desc}</p>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
