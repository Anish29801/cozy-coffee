'use client';

import { useEffect, useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  active: boolean;
  subscribedAt: string;
}

interface Stats {
  totalActive: number;
  totalUnsubscribed: number;
  thisMonth: number;
}

export function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [subRes, statsRes] = await Promise.all([
        api.newsletter.list(),
        api.newsletter.stats(),
      ]);
      if (subRes.success && Array.isArray(subRes.data)) {
        setSubscribers(subRes.data as Subscriber[]);
      }
      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data as Stats);
      }
    } catch { setMsg('Failed to load subscribers'); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-espresso mb-4">Newsletter Subscribers</h3>

      {msg && <div className="mb-4 rounded-lg bg-moss/10 px-4 py-2 text-sm text-moss">{msg}</div>}

      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border bg-white p-4 text-center">
            <p className="text-2xl font-display font-semibold text-espresso">{stats.totalActive}</p>
            <p className="text-xs text-espresso/50 mt-1">Active</p>
          </div>
          <div className="rounded-xl border bg-white p-4 text-center">
            <p className="text-2xl font-display font-semibold text-clay">{stats.thisMonth}</p>
            <p className="text-xs text-espresso/50 mt-1">This Month</p>
          </div>
          <div className="rounded-xl border bg-white p-4 text-center">
            <p className="text-2xl font-display font-semibold text-espresso/40">{stats.totalUnsubscribed}</p>
            <p className="text-xs text-espresso/50 mt-1">Unsubscribed</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-12 rounded-xl bg-fog animate-pulse" />)}
        </div>
      ) : subscribers.length === 0 ? (
        <p className="text-sm text-espresso/50 py-8 text-center">No subscribers yet.</p>
      ) : (
        <div className="space-y-2">
          {subscribers.map((s) => (
            <div key={s._id} className="flex items-center gap-4 rounded-xl border bg-white px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-clay/10 flex items-center justify-center text-xs font-medium text-clay">
                {(s.name || s.email)[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-espresso truncate">{s.email}</p>
                {s.name && <p className="text-xs text-espresso/50">{s.name}</p>}
              </div>
              <p className="text-xs text-espresso/40 shrink-0">{formatDate(s.subscribedAt)}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${s.active ? 'bg-moss/10 text-moss' : 'bg-espresso/10 text-espresso/40'}`}>
                {s.active ? 'Active' : 'Unsubscribed'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
