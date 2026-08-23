import type { Metadata } from "next";
import { StoryTimeline } from "@/components/site/StoryTimeline";

export const metadata: Metadata = {
  title: "Our Story â€” Cozy Coffee CafÃ©",
  description: "Friendly, welcoming, warmth, togetherness â€” one table, two chairs, whole neighborhood",
};

export default function StoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.18em] uppercase text-clay">Our story</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-espresso">The bell, the wood, the neighbors</h1>
        <p className="mt-4 text-[17px] leading-7 text-espresso/70">
          We didn&apos;t open a coffee shop. We opened a living room. The bell still rings the same way it did on day one â€”
          you walk in, the warmth hits, and someone nods like you belong. Because you do.
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="aspect-[4/3] rounded-[24px] border bg-fog shadow-warm overflow-hidden relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=80&auto=format&fit=crop"
            alt="Cozy cafÃ© interior"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        </div>
        <div className="rounded-[24px] border bg-cream p-6 flex flex-col justify-center">
          <p className="font-hand text-2xl text-clay">â€œWe remember how you take it.â€</p>
          <p className="mt-3 text-sm leading-6 text-espresso/60">
            Sourcing: washed Colombia, natural Ethiopia this season. Milk steamed slow at 62Â°C. Bread baked at 5am, 48h ferment.
            Butter cultured nearby. Pastries small, honest, crumbs expected.
          </p>
          <p className="mt-3 text-xs tracking-[0.16em] uppercase text-espresso/40">Visit â€” 123 Warmth Lane Â· 7am daily</p>
        </div>
      </div>

      <div className="mt-14">
        <StoryTimeline />
      </div>

      <div className="mt-14 rounded-[24px] border bg-fog/30 p-8">
        <h2 className="font-display text-2xl font-semibold text-espresso">You make it together</h2>
        <p className="mt-2 text-sm leading-6 text-espresso/60 max-w-2xl">
          The community board is real. Bring a note, leave a note. Lost keys, found cats, spare tomatoes. First sip is always
          together â€” we taste at 7am, all of us, before we open. Come taste tomorrow.
        </p>
      </div>
    </div>
  );
}
