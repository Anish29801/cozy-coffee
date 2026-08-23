import type { Metadata } from "next";
import { ReservationForm } from "@/components/site/ReservationForm";

export const metadata: Metadata = {
  title: "Reserve — Cozy Coffee Café",
  description: "Reserve your table — we'll remember your name",
};

export default function ReservePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <p className="text-xs tracking-[0.18em] uppercase text-clay">Reserve</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-espresso">Save your usual table</h1>
      <p className="mt-3 text-[17px] leading-7 text-espresso/70">
        For 5+ or the slow table, a note helps. For 1–4 — just come, we save tables anyway.
      </p>
      <div className="mt-8 rounded-[24px] border bg-white p-6 md:p-8 shadow-warm">
        <ReservationForm />
      </div>
      <p className="mt-6 text-sm text-espresso/40">Prefer human? hello@cozy.coffee · (555) 123-4567 · 123 Warmth Lane</p>
    </div>
  );
}
