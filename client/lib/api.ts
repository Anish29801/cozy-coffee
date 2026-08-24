const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string; details?: Record<string, string[]> };
  meta?: { page: number; limit: number; total: number; totalPages: number };
}

async function request<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.error?.message || `Request failed: ${res.status}`);
  }
  return json;
}

export const api = {
  menu: {
    list: (params?: string) => request<unknown[]>(`/api/menu${params ? `?${params}` : ''}`),
    get: (slug: string) => request<unknown>(`/api/menu/${slug}`),
    create: (data: unknown) => request<unknown>('/api/menu', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: unknown) => request<unknown>(`/api/menu/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => request<unknown>(`/api/menu/${id}`, { method: 'DELETE' }),
  },
  reservations: {
    create: (data: { name: string; email?: string; phone?: string; date: string; time: string; partySize: number; notes?: string }) =>
      request<unknown>('/api/reservations', { method: 'POST', body: JSON.stringify(data) }),
    list: (params?: string) => request<unknown[]>(`/api/reservations${params ? `?${params}` : ''}`),
    get: (id: string) => request<unknown>(`/api/reservations/${id}`),
    updateStatus: (id: string, status: string) =>
      request<unknown>(`/api/reservations/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    delete: (id: string) => request<unknown>(`/api/reservations/${id}`, { method: 'DELETE' }),
  },
  newsletter: {
    subscribe: (data: { email: string; name?: string }) =>
      request<unknown>('/api/newsletter/subscribe', { method: 'POST', body: JSON.stringify(data) }),
    list: () => request<unknown[]>('/api/newsletter/subscribers'),
    stats: () => request<{ totalActive: number; totalUnsubscribed: number; thisMonth: number }>('/api/newsletter/stats'),
    remove: (id: string) => request<unknown>(`/api/newsletter/subscribers/${id}`, { method: 'DELETE' }),
  },
  testimonials: {
    list: () => request<unknown[]>('/api/testimonials'),
    listAll: () => request<unknown[]>('/api/testimonials/all'),
    get: (id: string) => request<unknown>(`/api/testimonials/${id}`),
    create: (data: unknown) => request<unknown>('/api/testimonials', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: unknown) => request<unknown>(`/api/testimonials/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    remove: (id: string) => request<unknown>(`/api/testimonials/${id}`, { method: 'DELETE' }),
  },
};
