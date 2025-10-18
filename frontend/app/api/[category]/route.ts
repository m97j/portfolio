// frontend/app/api/[category]/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

// GET /api/[category]?...
export async function GET(req: Request, { params }: { params: { category: string } }) {
  const url = new URL(req.url);
  const query = url.search; // ?limit=...&offset=...
  const res = await fetch(`${API_URL}/api/${params.category}${query}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// POST /api/[category]
export async function POST(req: Request, { params }: { params: { category: string } }) {
  const body = await req.json();
  const res = await fetch(`${API_URL}/api/${params.category}`, {
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
