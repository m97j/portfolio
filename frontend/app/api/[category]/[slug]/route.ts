// frontend/app/api/[category]/[slug]/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

function ensureApiUrl() {
  if (!API_URL) {
    console.warn("API_URL is not defined. Make sure it's set in Azure App Service.");
    return null;
  }
  return API_URL;
}

export async function GET(req: Request, { params }: { params: { category: string; slug: string } }) {
  const base = ensureApiUrl();
  if (!base) return NextResponse.json({ error: "API_URL not configured" }, { status: 500 });

  const res = await fetch(`${base}/api/${params.category}/${params.slug}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PUT(req: Request, { params }: { params: { category: string; slug: string } }) {
  const base = ensureApiUrl();
  if (!base) return NextResponse.json({ error: "API_URL not configured" }, { status: 500 });

  const body = await req.json();
  const res = await fetch(`${base}/api/${params.category}/${params.slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(req: Request, { params }: { params: { category: string; slug: string } }) {
  const base = ensureApiUrl();
  if (!base) return NextResponse.json({ error: "API_URL not configured" }, { status: 500 });

  const res = await fetch(`${base}/api/${params.category}/${params.slug}`, {
    method: "DELETE",
    headers: {
      Authorization: req.headers.get("authorization") || "",
    },
  });

  if (res.status === 204) {
    return NextResponse.json({}, { status: 204 });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
