import Link from "next/link";
import type { JournalPost } from "@/lib/content";

export function JournalCard({ post }: { post: JournalPost }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group rounded-[24px] border bg-white p-6 shadow-warm hover:shadow-[0_16px_32px_rgba(60,36,21,0.12)] transition-shadow block"
    >
      <p className="text-xs tracking-[0.16em] uppercase text-moss">
        {post.date} · {post.author}
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-espresso group-hover:text-clay transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-espresso/60 line-clamp-3">{post.excerpt}</p>
      {post.tags && <p className="mt-3 text-xs text-espresso/40">{post.tags.join(" · ")}</p>}
      <span className="mt-4 inline-flex text-sm font-medium text-clay">Read →</span>
    </Link>
  );
}
