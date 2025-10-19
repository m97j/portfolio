// frontend/lib/api.ts

// BASE는 항상 상대경로 (Next.js API Route 프록시를 거침)
const BASE = "";

function buildUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${BASE}${path}`;
}

// 일반 fetch
export async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(buildUrl(path), init);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// 인증 fetch
export async function fetchAuthJSON<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  const headers = {
    ...(init.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(buildUrl(path), { cache: "no-cache", ...init, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Posts API
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

  update: (category: "notes" | "blogs" | "projects", slug: string, body: any) =>
    fetchAuthJSON<any>(`/api/${category}/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

  delete: (category: "notes" | "blogs" | "projects", slug: string) =>
    fetchAuthJSON<void>(`/api/${category}/${slug}`, { method: "DELETE" }),
};

// Tags API
export const TagsAPI = {
  list: () =>
    fetchJSON<{ items: { emoji: string; label: string; description: string }[] }>(`/api/tags`),
};
