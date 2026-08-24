import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJournal, getJournalBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getJournal().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Cozy Coffee Journal`,
    description: post.excerpt,
  };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getJournalBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <p className="text-xs tracking-[0.16em] uppercase text-moss">
        {post.date} · {post.author} {post.tags && `· ${post.tags.join(" · ")}`}
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-espresso">{post.title}</h1>
      <p className="mt-4 font-hand text-xl text-clay">{post.excerpt}</p>

      <div className="mt-8 prose prose-stone max-w-none prose-p:leading-7 prose-p:text-espresso/80 prose-headings:font-display prose-headings:text-espresso prose-strong:text-espresso">
        <div className="whitespace-pre-wrap text-[17px] leading-7 text-espresso/80">{post.body}</div>
      </div>

      <div className="mt-10 rounded-[16px] border border-dashed bg-cream p-6">
        <p className="font-hand text-xl text-espresso">Your usual table is waiting — come taste this story in person.</p>
        <p className="mt-2 text-sm text-espresso/60">123 Warmth Lane · hello@cozy.coffee</p>
      </div>
    </article>
  );
}
