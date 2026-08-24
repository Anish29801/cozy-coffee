'use client';

import { useState } from 'react';
import { MenuAdmin } from '@/components/site/admin/MenuAdmin';
import { ReservationsAdmin } from '@/components/site/admin/ReservationsAdmin';
import { NewsletterAdmin } from '@/components/site/admin/NewsletterAdmin';
import { TestimonialsAdmin } from '@/components/site/admin/TestimonialsAdmin';

type Tab = 'menu' | 'reservations' | 'newsletter' | 'testimonials';

const tabs: { id: Tab; label: string; emoji: string }[] = [
  { id: 'menu', label: 'Menu', emoji: '☕' },
  { id: 'reservations', label: 'Reservations', emoji: '📅' },
  { id: 'newsletter', label: 'Newsletter', emoji: '✉️' },
  { id: 'testimonials', label: 'Testimonials', emoji: '💬' },
];

export default function AdminPage() {
  const [active, setActive] = useState<Tab>('menu');

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <div className="mb-8">
        <p className="text-xs tracking-[0.18em] uppercase text-clay">Dashboard</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-espresso">
          Admin
        </h1>
        <p className="mt-2 text-sm text-espresso/60">
          Manage your menu, reservations, subscribers, and testimonials.
        </p>
      </div>

      <div className="flex gap-1 rounded-xl bg-fog p-1 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
              active === tab.id
                ? 'bg-white text-espresso shadow-sm'
                : 'text-espresso/50 hover:text-espresso'
            }`}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border bg-white/50 p-6">
        {active === 'menu' && <MenuAdmin />}
        {active === 'reservations' && <ReservationsAdmin />}
        {active === 'newsletter' && <NewsletterAdmin />}
        {active === 'testimonials' && <TestimonialsAdmin />}
      </div>
    </div>
  );
}
