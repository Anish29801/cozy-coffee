"use client";

import { Reveal } from "./TextureOverlay";

const ethos = [
  { title: "Friendly", desc: "We remember your name, your dog, and how you take it. No rushed orders." },
  { title: "Warmth", desc: "Wood, linen, ceramic. A room that feels like a hug when the bell rings." },
  { title: "Togetherness", desc: "Tables for strangers to become regulars. The first sip is for the room." },
];

export function EthosStrip() {
  return (
    <section className="border-y bg-fog/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {ethos.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.1}>
              <div className="relative">
                <p className="font-hand text-2xl text-clay">{item.title.toLowerCase()}</p>
                <p className="mt-1 font-display text-lg font-semibold text-espresso">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-espresso/60">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
