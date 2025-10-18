// frontend/lib/api.ts

// 백엔드 API의 base URL (환경변수에서 주입)
const BASE = process.env.NEXT_PUBLIC_API_URL!;

// 항상 절대 URL을 만들어주는 함수
function buildUrl(path: string) {
  // 이미 http로 시작하면 그대로 사용
  if (path.startsWith("http")) return path;
  // BASE와 합쳐서 절대 URL 생성
  return `${BASE}${path}`;
}

// 일반 fetch (토큰 불필요)
export async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(buildUrl(path), init);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// 인증이 필요한 fetch (토큰 포함)
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

// Tags API
export const TagsAPI = {
  list: () =>
    fetchJSON<{ items: { emoji: string; label: string; description: string }[] }>(`/api/tags`),
};
