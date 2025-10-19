// frontend/app/api/auth/login/route.ts
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

  const body = await req.json();
  const res = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include", 
  });

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
