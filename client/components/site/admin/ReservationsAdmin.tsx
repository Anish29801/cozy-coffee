'use client';

import { useEffect, useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface Reservation {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  partySize: number;
  notes?: string;
  status: string;
  createdAt: string;
}

const statuses = ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'] as const;

const statusColors: Record<string, string> = {
  pending: 'bg-gold/10 text-gold',
  confirmed: 'bg-moss/10 text-moss',
  cancelled: 'bg-espresso/10 text-espresso/50',
  completed: 'bg-clay/10 text-clay',
  no_show: 'bg-espresso/10 text-espresso/40',
};

export function ReservationsAdmin() {
  const [items, setItems] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter ? `status=${filter}&limit=50` : 'limit=50';
      const res = await api.reservations.list(params);
      if (res.success && Array.isArray(res.data)) {
        setItems(res.data as Reservation[]);
      }
    } catch { setMsg('Failed to load reservations'); }
    setLoading(false);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: string, status: string) {
    try {
      await api.reservations.updateStatus(id, status);
      setMsg(`Status updated to "${status}"`);
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed');
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete reservation for "${name}"?`)) return;
    try {
      await api.reservations.delete(id);
      setMsg(`Reservation for "${name}" deleted`);
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed');
    }
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl font-semibold text-espresso">Reservations</h3>
        <div className="flex items-center gap-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border bg-fog/50 px-3 py-1.5 text-xs text-espresso">
            <option value="">All statuses</option>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {msg && <div className="mb-4 rounded-lg bg-moss/10 px-4 py-2 text-sm text-moss">{msg}</div>}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-20 rounded-xl bg-fog animate-pulse" />)}
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-espresso/50 py-8 text-center">No reservations found.</p>
      ) : (
        <div className="space-y-2">
          {items.map((r) => (
            <div key={r._id} className="rounded-xl border bg-white px-4 py-3">
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-espresso">{r.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[r.status] || 'bg-fog text-espresso/50'}`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xs text-espresso/50 mt-0.5">
                    {formatDate(r.date)} at {r.time} · Party of {r.partySize} · {r.email}
                  </p>
                  {r.notes && <p className="text-xs text-espresso/40 mt-1 italic">&ldquo;{r.notes}&rdquo;</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {r.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(r._id, 'confirmed')}
                        className="text-xs bg-moss/10 text-moss px-3 py-1 rounded-full hover:bg-moss/20 transition">
                        Confirm
                      </button>
                      <button onClick={() => updateStatus(r._id, 'cancelled')}
                        className="text-xs bg-espresso/10 text-espresso/50 px-3 py-1 rounded-full hover:bg-red-50 transition">
                        Cancel
                      </button>
                    </>
                  )}
                  {r.status === 'confirmed' && (
                    <button onClick={() => updateStatus(r._id, 'completed')}
                      className="text-xs bg-clay/10 text-clay px-3 py-1 rounded-full hover:bg-clay/20 transition">
                      Complete
                    </button>
                  )}
                  <button onClick={() => handleDelete(r._id, r.name)}
                    className="text-xs text-espresso/30 hover:text-red-500 transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
