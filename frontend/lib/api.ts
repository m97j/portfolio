// frontend/lib/api.ts

// 프론트/SSR 모두에서 사용할 백엔드 API 주소
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

// Posts
export const PostsAPI = {
  list: (category: "notes" | "vlogs" | "projects", params: URLSearchParams) =>
    fetchJSON<{ items: any[]; total: number }>(`/api/${category}?${params.toString()}`),
  bySlug: (category: "notes" | "vlogs" | "projects", slug: string) =>
    fetchJSON<any>(`/api/${category}/${slug}`),
};

// Tags
export const TagsAPI = {
  list: () =>
    fetchJSON<{ items: { emoji: string; label: string; description: string }[] }>(`/api/tags`),
};
