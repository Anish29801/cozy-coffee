import { z } from "zod";

// Reserve — warm, human copy on errors
export const reserveSchema = z.object({
  name: z.string().min(2, "What should we call you?").max(60),
  email: z.string().email("That email doesn't look right").max(120).optional().or(z.literal("")),
  date: z.string().min(4, "When are you coming?"),
  party: z.coerce.number().int().min(1).max(12),
  note: z.string().max(300).optional().or(z.literal("")),
  // honeypot — must be empty
  company: z.string().max(0, "Must be empty").optional().or(z.literal("")),
});

export type ReserveInput = z.infer<typeof reserveSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("We'll need a real email for your invite").max(120),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

// Content frontmatter
export const menuItemSchema = z.object({
  title: z.string().min(1),
  price: z.string().min(1),
  category: z.enum(["Espresso", "Filter", "Pastries", "Lunch", "Seasonal"]),
  seasonal: z.boolean().optional(),
  allergens: z.array(z.string()).optional(),
  story: z.string().optional(),
  image: z.string().optional(),
});

export type MenuItem = z.infer<typeof menuItemSchema> & { slug: string; body: string };

export const journalPostSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(4),
  author: z.string().min(1),
  cover: z.string().optional(),
  excerpt: z.string().min(10).max(220),
  tags: z.array(z.string()).optional(),
});

export type JournalPost = z.infer<typeof journalPostSchema> & { slug: string; body: string };
