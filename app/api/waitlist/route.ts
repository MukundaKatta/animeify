import { NextRequest, NextResponse } from "next/server";

const WAITLIST_API = "https://waitlist-api-sigma.vercel.app/api/waitlist";

export async function POST(req: NextRequest) {
  const body = await req.json() as { email?: string };
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!email) {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }

  const upstream = await fetch(WAITLIST_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, product: "animeify" }),
  });

  const data: unknown = await upstream.json().catch(() => ({}));
  return NextResponse.json(data, { status: upstream.status });
}
