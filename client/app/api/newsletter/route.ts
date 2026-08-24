import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid email" }, { status: 400 });
    }
    if (parsed.data.company && parsed.data.company.length > 0) {
      return NextResponse.json({ error: "Must be empty" }, { status: 400 });
    }

    console.log(`[Newsletter] ${parsed.data.email}`);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Could not join — try again" }, { status: 500 });
  }
}
