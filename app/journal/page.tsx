import type { Metadata } from "next";
import { getJournal } from "@/lib/content";
import { JournalCard } from "@/components/site/JournalCard";

export const metadata: Metadata = {
  title: "Journal â€” Cozy Coffee CafÃ©",
  description: "Brew guides, community stories, slow letters â€” togetherness in words",
};

export default function JournalPage() {
  const posts = getJournal();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.18em] uppercase text-clay">Journal</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-espresso">Slow letters</h1>
        <p className="mt-3 text-[17px] leading-7 text-espresso/70">Brew guides, community stories, and notes from the room. No algorithm, just honesty.</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <JournalCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && <p className="mt-10 text-sm text-espresso/60">No letters yet â€” check back after the 7am first sip.</p>}
    </div>
  );
}
