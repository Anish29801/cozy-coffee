'use client';

import { useEffect, useState, useCallback } from 'react';
import { api } from '@/lib/api';

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
  sortOrder: number;
}

const categories = ['espresso', 'filter', 'specialty', 'cold_drinks', 'pastries', 'light_bite', 'lunch'];

const emptyItem = {
  title: '', price: '', category: 'espresso', description: '',
  story: '', origin: '', imageUrl: '', allergens: '',
  seasonal: false, available: true, sortOrder: 0,
};

export function MenuAdmin() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyItem);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.menu.list('limit=100');
      if (res.success && Array.isArray(res.data)) {
        setItems(res.data as MenuItem[]);
      }
    } catch { setMsg('Failed to load menu'); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function startCreate() {
    setEditing(null);
    setForm(emptyItem);
    setShowForm(true);
    setMsg('');
  }

  function startEdit(item: MenuItem) {
    setEditing(item);
    setForm({
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description || '',
      story: item.story || '',
      origin: item.origin || '',
      imageUrl: item.imageUrl || '',
      allergens: item.allergens.join(', '),
      seasonal: item.seasonal,
      available: item.available,
      sortOrder: item.sortOrder,
    });
    setShowForm(true);
    setMsg('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      allergens: form.allergens ? form.allergens.split(',').map((a) => a.trim()).filter(Boolean) : [],
    };

    try {
      if (editing) {
        await api.menu.update(editing._id, payload);
        setMsg(`"${form.title}" updated`);
      } else {
        await api.menu.create(payload);
        setMsg(`"${form.title}" created`);
      }
      setShowForm(false);
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed');
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await api.menu.delete(id);
      setMsg(`"${title}" deleted`);
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl font-semibold text-espresso">Menu Items</h3>
        <button onClick={startCreate} className="rounded-full bg-clay px-4 py-2 text-sm font-medium text-white hover:bg-clay/90 transition">
          + Add Item
        </button>
      </div>

      {msg && (
        <div className="mb-4 rounded-lg bg-moss/10 px-4 py-2 text-sm text-moss">{msg}</div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-2xl border bg-white p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-espresso/60 mb-1">Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso" />
            </div>
            <div>
              <label className="block text-xs font-medium text-espresso/60 mb-1">Price *</label>
              <input required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="$5.00" className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-espresso/60 mb-1">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-espresso/60 mb-1">Allergens (comma-separated)</label>
              <input value={form.allergens} onChange={(e) => setForm({ ...form, allergens: e.target.value })}
                placeholder="Milk, Gluten" className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-espresso/60 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2} className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-espresso/60 mb-1">Origin</label>
              <input value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })}
                placeholder="Ethiopia Yirgacheffe" className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso" />
            </div>
            <div>
              <label className="block text-xs font-medium text-espresso/60 mb-1">Image URL</label>
              <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-espresso/60 mb-1">Story</label>
            <textarea value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })}
              rows={2} className="w-full rounded-lg border bg-fog/50 px-3 py-2 text-sm text-espresso" />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-espresso">
              <input type="checkbox" checked={form.seasonal} onChange={(e) => setForm({ ...form, seasonal: e.target.checked })}
                className="rounded border-espresso" />
              Seasonal
            </label>
            <label className="flex items-center gap-2 text-sm text-espresso">
              <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })}
                className="rounded border-espresso" />
              Available
            </label>
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
        <p className="text-sm text-espresso/50 py-8 text-center">No menu items yet. Add one above.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4 rounded-xl border bg-white px-4 py-3">
              {item.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt="" className="h-10 w-10 rounded-lg object-cover" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-espresso truncate">{item.title}</p>
                <p className="text-xs text-espresso/50">{item.category} · {item.price}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${item.available ? 'bg-moss/10 text-moss' : 'bg-espresso/10 text-espresso/50'}`}>
                {item.available ? 'Active' : 'Hidden'}
              </span>
              {item.seasonal && <span className="text-xs px-2 py-0.5 rounded-full bg-clay/10 text-clay">Seasonal</span>}
              <button onClick={() => startEdit(item)} className="text-xs text-clay hover:text-espresso transition">Edit</button>
              <button onClick={() => handleDelete(item._id, item.title)} className="text-xs text-espresso/30 hover:text-red-500 transition">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
