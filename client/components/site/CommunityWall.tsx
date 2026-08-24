const quotes = [
  { name: "Amara · regular since 2019", text: "They knew my dog's name before mine. Now I know everyone's." },
  { name: "Luis · baker neighbor", text: "Butter at 6am, coffee at 7. The block smells like home." },
  { name: "Sam & Jo · corner table", text: "No outlet, no hurry. Best table in the city." },
];

export function CommunityWall() {
  return (
    <section className="rounded-[24px] border bg-cream p-6 md:p-8 shadow-warm">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-clay">Together</p>
          <h3 className="font-display text-2xl font-semibold text-espresso">What the room says</h3>
        </div>
        <span className="hidden md:inline font-hand text-lg text-espresso/40">pinned · warm · true</span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {quotes.map((q) => (
          <div key={q.name} className="rounded-[16px] border bg-white p-5">
            <p className="font-hand text-lg leading-6 text-espresso">“{q.text}”</p>
            <p className="mt-3 text-xs tracking-[0.16em] uppercase text-espresso/40">{q.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[16px] border border-dashed bg-fog/30 p-4 text-sm text-espresso/60">
        <span className="font-medium text-espresso">Community board:</span> Lost keys, found cat (Miso!), spare tomatoes, free piano lessons — bring a note, leave a note.
      </div>
    </section>
  );
}
