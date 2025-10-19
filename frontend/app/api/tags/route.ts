// frontend/app/api/tags/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

function ensureApiUrl() {
  if (!API_URL) {
    console.warn("API_URL is not defined. Make sure it's set in Azure App Service.");
    return null;
  }
  return API_URL;
}

export async function GET() {
  const base = ensureApiUrl();
  if (!base) return NextResponse.json({ error: "API_URL not configured" }, { status: 500 });

  const res = await fetch(`${base}/api/tags`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
