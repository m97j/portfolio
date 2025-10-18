// frontend/lib/api.ts

const BASE = process.env.NEXT_PUBLIC_API_URL!; 

export async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, init);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchAuthJSON<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  const headers = {
    ...(init.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(`${BASE}${path}`, { cache: "no-cache", ...init, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Posts API 확장
export const PostsAPI = {
  list: (category: "notes" | "blogs" | "projects", params: URLSearchParams) =>
    fetchJSON<{ items: any[]; total: number }>(`/api/${category}?${params.toString()}`),

  bySlug: (category: "notes" | "blogs" | "projects", slug: string) =>
    fetchJSON<any>(`/api/${category}/${slug}`),

  create: (category: "notes" | "blogs" | "projects", body: any) =>
    fetchAuthJSON<any>(`/api/${category}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

  update: (category: "notes" | "blogs" | "projects", id: string, body: any) =>
    fetchAuthJSON<any>(`/api/${category}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

  delete: (category: "notes" | "blogs" | "projects", id: string) =>
    fetchAuthJSON<void>(`/api/${category}/${id}`, { method: "DELETE" }),
};

// Tags
export const TagsAPI = {
  list: () =>
    fetchJSON<{ items: { emoji: string; label: string; description: string }[] }>(`/api/tags`),
};
