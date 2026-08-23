"use client";

import { Reveal } from "./TextureOverlay";

type Testimonial = {
  name: string;
  role: string;
  gender: "male" | "female";
  image: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Aarav Singh",
    role: "Regular since 2019 · Espresso, black",
    gender: "male",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "They knew my name before my order. Now my daughter does her homework here — the slow table is our second home.",
  },
  {
    name: "Priya Sharma",
    role: "Neighbor · Oat flat white, always",
    gender: "female",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Warm, not trendy. The bell rings, someone smiles — you feel you belong. And the sourdough? Still warm when they serve it.",
  },
  {
    name: "Rohan Patel",
    role: "Baker next door · Pour-over",
    gender: "male",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    text: "We trade butter at 6am, coffee at 7. The whole lane smells like home. Best room for strangers to become friends.",
  },
  {
    name: "Ananya Gupta",
    role: "Student · Chai + cinnamon roll",
    gender: "female",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "No one rushes you. I came for WiFi, stayed for the people. The first sip is for the room — you have to hear it.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-clay">Voices</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-espresso">What neighbors say</h2>
            <p className="mt-2 font-hand text-xl text-espresso/50">Four tables, four stories — all together</p>
          </div>
          <span className="hidden md:inline text-xs tracking-[0.16em] uppercase text-espresso/40">★ 4.9 from 600+ regulars</span>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {testimonials.map((t, idx) => (
          <Reveal key={t.name} delay={idx * 0.08}>
            <div className="flex gap-4 rounded-[24px] border bg-white p-6 shadow-warm hover:shadow-[0_12px_32px_rgba(60,36,21,0.10)] transition-all duration-500 hover:-translate-y-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.image}
                alt={`${t.name} — ${t.gender}`}
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-full object-cover border-2 border-fog"
                loading="lazy"
              />
              <div>
                <p className="font-hand text-lg leading-6 text-espresso">“{t.text}”</p>
                <p className="mt-3 font-display text-sm font-semibold text-espresso">{t.name}</p>
                <p className="text-xs tracking-[0.16em] uppercase text-espresso/40">{t.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 text-center font-hand text-base text-espresso/40">
        Real portraits via randomuser.me (nat=in) — gender matched, Indian names, warm like the room.
      </p>
    </section>
  );
}
