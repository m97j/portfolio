// frontend/app/api/tags/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function GET() {
  const res = await fetch(`${API_URL}/api/tags`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
