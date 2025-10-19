// frontend/app/api/auth/refresh/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

function ensureApiUrl() {
  if (!API_URL) {
    console.warn("API_URL is not defined. Make sure it's set in Azure App Service.");
    return null;
  }
  return API_URL;
}

export async function POST(req: Request) {
  const base = ensureApiUrl();
  if (!base) {
    return NextResponse.json({ error: "API_URL not configured" }, { status: 500 });
  }

  // refresh는 body가 필요 없고, 쿠키 기반으로 동작
  const res = await fetch(`${base}/api/auth/refresh`, {
    method: "POST",
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
