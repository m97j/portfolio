// const BASE = process.env.NEXT_PUBLIC_API_BASE; // e.g. "https://api.yourdomain.com"
const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function fetchPosts(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : "";
  const res = await fetch(`${BASE}/api/posts${qs}`, { cache: "no-store" });
  return res.json();
}

export async function fetchPost(slug: string) {
  const res = await fetch(`${BASE}/api/posts/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

// Admin calls (add headers)
export async function adminCreatePost(dto: any, id: string, token: string) {
  const res = await fetch(`${BASE}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-id": id,
      "x-admin-token": token,
    },
    body: JSON.stringify(dto),
  });
  return res.json();
}
