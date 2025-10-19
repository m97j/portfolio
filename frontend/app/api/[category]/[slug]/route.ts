// frontend/app/api/[category]/[slug]/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function GET(req: Request, { params }: { params: { category: string; slug: string } }) {
  const res = await fetch(`${API_URL}/api/${params.category}/${params.slug}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PUT(req: Request, { params }: { params: { category: string; slug: string } }) {
  const body = await req.json();
  const res = await fetch(`${API_URL}/api/${params.category}/${params.slug}`, {
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
  const res = await fetch(`${API_URL}/api/${params.category}/${params.slug}`, {
    method: "DELETE",
    headers: {
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
