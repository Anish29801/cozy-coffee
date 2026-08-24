import { NextResponse } from "next/server";
import { reserveSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = reserveSchema.safeParse(body);

    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || "Invalid request";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    // honeypot — must be empty
    if (parsed.data.company && parsed.data.company.length > 0) {
      return NextResponse.json({ error: "Must be empty" }, { status: 400 });
    }

    // Warm log — like a barista note
    console.log(`[Reserve] ${parsed.data.name} · ${parsed.data.date} · party ${parsed.data.party}`);

    // Mock email — replace with Resend later (RESEND_API_KEY)
    // await resend.emails.send({...})

    return NextResponse.json({ ok: true, message: "Warm — we got your request" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Could not process — try hello@cozy.coffee" }, { status: 500 });
  }
}
