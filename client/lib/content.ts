import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { menuItemSchema, journalPostSchema } from "./validations";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type MenuItem = {
  slug: string;
  title: string;
  price: string;
  category: "Espresso" | "Filter" | "Pastries" | "Lunch" | "Seasonal";
  seasonal?: boolean;
  allergens?: string[];
  story?: string;
  image?: string;
  body: string;
};

export type JournalPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  cover?: string;
  excerpt: string;
  tags?: string[];
  body: string;
};

function readMdx(dir: string, slug: string): { data: Record<string, unknown>; content: string } {
  const filePath = path.join(CONTENT_DIR, dir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return { data: parsed.data as Record<string, unknown>, content: parsed.content };
}

export function getMenu(): MenuItem[] {
  const dir = path.join(CONTENT_DIR, "menu");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data, content } = readMdx("menu", slug);
      const parsed = menuItemSchema.parse(data);
      return { slug, body: content, ...parsed };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getJournal(): JournalPost[] {
  const dir = path.join(CONTENT_DIR, "journal");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data, content } = readMdx("journal", slug);
      const parsed = journalPostSchema.parse(data);
      return { slug, body: content, ...parsed };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getJournalBySlug(slug: string): JournalPost | null {
  try {
    const { data, content } = readMdx("journal", slug);
    const parsed = journalPostSchema.parse(data);
    return { slug, body: content, ...parsed };
  } catch {
    return null;
  }
}
