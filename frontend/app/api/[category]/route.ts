// frontend/app/api/[category]/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

function ensureApiUrl() {
  if (!API_URL) {
    console.warn("API_URL is not defined. Make sure it's set in Azure App Service.");
    return null;
  }
  return API_URL;
}

export async function GET(req: Request, { params }: { params: { category: string } }) {
  const base = ensureApiUrl();
  if (!base) return NextResponse.json({ error: "API_URL not configured" }, { status: 500 });

  const url = new URL(req.url);
  const query = url.search;
  const res = await fetch(`${base}/api/${params.category}${query}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: Request, { params }: { params: { category: string } }) {
  const base = ensureApiUrl();
  if (!base) return NextResponse.json({ error: "API_URL not configured" }, { status: 500 });

  const body = await req.json();
  const res = await fetch(`${base}/api/${params.category}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
