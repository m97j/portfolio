// frontend/lib/api.ts
import { headers } from "next/headers";

// 서버/클라이언트 환경에 따라 BASE URL을 다르게 반환
function getBaseUrl() {
  // 서버 환경일 때: 현재 요청의 host를 이용해 절대 URL 생성
  if (typeof window === "undefined") {
    const host = headers().get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    return `${protocol}://${host}`;
  }
  // 클라이언트 환경일 때: 상대경로 사용
  return "";
}

const BASE = getBaseUrl();

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
