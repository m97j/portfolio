// frontend/lib/api.ts
function getBaseUrl() {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  }
  // 서버: 절대 URL 필요
  return process.env.API_URL ?? "http://localhost:4000";
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

// 인증 fetch (자동 refresh 지원)
export async function fetchAuthJSON<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  const headers = {
    ...(init.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let res = await fetch(buildUrl(path), { cache: "no-cache", ...init, headers });

  // Access Token 만료 → refresh 시도
  if (res.status === 401 && typeof window !== "undefined") {
    const refreshRes = await fetch(buildUrl("/api/auth/refresh"), {
      method: "POST",
      credentials: "include", // Refresh Token은 HttpOnly 쿠키에 저장되어 있음
    });

    if (refreshRes.ok) {
      const { token: newToken } = await refreshRes.json();
      localStorage.setItem("adminToken", newToken);

      // 새 토큰으로 다시 요청
      const retryHeaders = {
        ...(init.headers || {}),
        Authorization: `Bearer ${newToken}`,
      };
      res = await fetch(buildUrl(path), { cache: "no-cache", ...init, headers: retryHeaders });
    } else {
      // Refresh Token도 만료 → 로그인 페이지로 이동
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
      throw new Error("Session expired");
    }
  }

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
