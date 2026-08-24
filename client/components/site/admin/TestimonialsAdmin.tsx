'use client';

import { useEffect, useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  gender: 'male' | 'female';
  image: string;
  text: string;
  active: boolean;
  sortOrder: number;
}

const emptyForm = {
  name: '', role: '', gender: 'female' as const, image: '', text: '',
  active: true, sortOrder: 0,
};

export function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.testimonials.listAll();
      if (res.success && Array.isArray(res.data)) {
        setItems(res.data as Testimonial[]);
      }
    } catch { setMsg('Failed to load testimonials'); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function startCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
    setMsg('');
  }

  function startEdit(item: Testimonial) {
    setEditing(item);
    setForm({
      name: item.name,
      role: item.role,
      gender: item.gender,
      image: item.image,
      text: item.text,
      active: item.active,
      sortOrder: item.sortOrder,
    });
    setShowForm(true);
    setMsg('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editing) {
        await api.testimonials.update(editing._id, form);
        setMsg(`"${form.name}" updated`);
      } else {
        await api.testimonials.create(form);
        setMsg(`"${form.name}" added`);
      }
      setShowForm(false);
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed');
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    try {
      await api.testimonials.remove(id);
      setMsg(`"${name}" deleted`);
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl font-semibold text-espresso">Testimonials</h3>
        <button onClick={startCreate}
          className="rounded-full bg-clay px-4 py-2 text-sm font-medium text-white hover:bg-clay/90 transition">
          + Add Testimonial
        </button>
      </div>

      {msg && <div className="mb-4 rounded-lg bg-moss/10 px-4 py-2 text-sm text-moss">{msg}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-2xl border bg-white p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-espresso/60 mb-1">Name *</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso" />
            </div>
            <div>
              <label className="block text-xs font-medium text-espresso/60 mb-1">Role *</label>
              <input required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Regular since 2019 · Espresso, black"
                className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-espresso/60 mb-1">Gender *</label>
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value as 'male' | 'female' })}
                className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso">
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-espresso/60 mb-1">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-espresso/60 mb-1">Image URL *</label>
            <input required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://randomuser.me/api/portraits/women/44.jpg"
              className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso" />
          </div>
          <div>
            <label className="block text-xs font-medium text-espresso/60 mb-1">Testimonial Text *</label>
            <textarea required value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
              rows={3} className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })}
              id="t-active" className="rounded border-espresso" />
            <label htmlFor="t-active" className="text-sm text-espresso">Visible on site</label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-clay px-5 py-2 text-sm font-medium text-white hover:bg-clay/90 transition">
              {editing ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="rounded-full border border-espresso/20 px-5 py-2 text-sm text-espresso hover:bg-fog transition">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-fog animate-pulse" />)}
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-espresso/50 py-8 text-center">No testimonials yet. Add one above.</p>
      ) : (
        <div className="space-y-2">
          {items.map((t) => (
            <div key={t._id} className="flex items-center gap-4 rounded-xl border bg-white px-4 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.image} alt="" className="h-10 w-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-espresso truncate">{t.name}</p>
                <p className="text-xs text-espresso/50 truncate">{t.role}</p>
              </div>
              <p className="text-xs text-espresso/40 max-w-[200px] truncate italic hidden sm:block">&ldquo;{t.text}&rdquo;</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${t.active ? 'bg-moss/10 text-moss' : 'bg-espresso/10 text-espresso/40'}`}>
                {t.active ? 'Visible' : 'Hidden'}
              </span>
              <button onClick={() => startEdit(t)} className="text-xs text-clay hover:text-espresso transition">Edit</button>
              <button onClick={() => handleDelete(t._id, t.name)} className="text-xs text-espresso/30 hover:text-red-500 transition">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
