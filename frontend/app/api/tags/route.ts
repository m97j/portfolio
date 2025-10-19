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
  if (!base) {
    return NextResponse.json({ error: "API_URL not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${base}/api/tags`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("Failed to fetch tags:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch tags" }, { status: 500 });
  }
}
