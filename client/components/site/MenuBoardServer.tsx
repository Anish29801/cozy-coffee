'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Reveal } from './TextureOverlay';

interface MenuItem {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  price: string;
  category: string;
  seasonal: boolean;
  available: boolean;
  allergens: string[];
  origin?: string;
  story?: string;
  imageUrl?: string;
}

interface MenuResponse {
  success: boolean;
  data: MenuItem[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const categoryEmoji: Record<string, string> = {
  espresso: '☕',
  filter: '🫖',
  specialty: '✨',
  cold_drinks: '🧊',
  pastries: '🥐',
  light_bite: '🥑',
  lunch: '🍽️',
};

export function MenuBoardServer() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`${API_BASE}/api/menu?limit=6`);
        if (!res.ok) throw new Error('Failed to fetch menu');
        const json: MenuResponse = await res.json();
        if (json.success) {
          setItems(json.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-clay">The board</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-espresso">
              Signature, seasonal, slow
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-24 bg-fog h-64" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="rounded-24 border border-dashed bg-cream p-8 text-center">
          <p className="text-espresso/60">Menu is taking a breather. Try again soon.</p>
          <p className="mt-2 text-xs text-espresso/40">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-clay">The board</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-espresso">
              Signature, seasonal, slow
            </h2>
            <p className="mt-2 font-hand text-xl text-espresso/50">
              From our kitchen to your table
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((item, idx) => (
          <Reveal key={item._id} delay={idx * 0.08}>
            <Card className="overflow-hidden bg-white hover:shadow-[0_16px_32px_rgba(60,36,21,0.10)] transition-shadow duration-500">
              {item.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-36 w-full object-cover hover:scale-[1.02] transition-transform duration-700"
                />
              )}
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{categoryEmoji[item.category] || '☕'}</span>
                    <h3 className="font-display text-lg font-semibold leading-tight text-espresso">
                      {item.title}
                    </h3>
                  </div>
                  <span className="rounded-full border bg-fog px-3 py-1 text-xs font-medium text-espresso">
                    {item.price}
                  </span>
                </div>

                <p className="mt-1 text-xs tracking-[0.16em] uppercase text-moss">
                  {item.category}
                </p>

                {item.description && (
                  <p className="mt-2 text-sm leading-6 text-espresso/60 line-clamp-2">
                    {item.description}
                  </p>
                )}

                {item.story && (
                  <p className="mt-3 text-sm leading-6 text-espresso/60 italic">
                    &ldquo;{item.story}&rdquo;
                  </p>
                )}

                {item.origin && (
                  <p className="mt-2 text-xs text-moss">
                    Origin: {item.origin}
                  </p>
                )}

                {item.allergens.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.allergens.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-fog px-2 py-0.5 text-[10px] text-espresso/50"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}

                {item.seasonal && (
                  <span className="mt-3 inline-block rounded-full bg-clay/10 px-2 py-0.5 text-[10px] font-medium text-clay">
                    Seasonal
                  </span>
                )}
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      {items.length === 0 && !loading && (
        <div className="mt-8 rounded-24 border border-dashed bg-cream p-8 text-center">
          <p className="text-espresso/60">No menu items yet. The kitchen is just warming up.</p>
        </div>
      )}
    </section>
  );
}
