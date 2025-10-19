// frontend/lib/api.ts

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // 클라이언트: 브라우저가 알아서 현재 origin을 붙여줌
    return "";
  }
  // 서버: 절대 URL 필요
  return process.env.API_URL ?? "http://localhost:3000";
}

function buildUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${getBaseUrl()}${path}`;
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
