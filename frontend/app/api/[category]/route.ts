import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { category: string } }) {
  const body = await req.json();
  const res = await fetch(`${process.env.API_URL}/api/${params.category}`, {
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
