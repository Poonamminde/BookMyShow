type ReqOptions = {
  method?: string;
  body?: any;
  token?: string | null;
};

const base = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:3000';

async function request(path: string, options: ReqOptions = {}) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (options.token) headers['Authorization'] = `Bearer ${options.token}`;

  const res = await fetch(base + path, {
    method: options.method ?? 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }

  if (!res.ok) {
    const message = data?.message || res.statusText || 'Request failed';
    throw new Error(message);
  }

  return data;
}

export const api = {
  get: (path: string, token?: string | null) => request(path, { method: 'GET', token }),
  post: (path: string, body?: any, token?: string | null) => request(path, { method: 'POST', body, token }),
};

export default api;
