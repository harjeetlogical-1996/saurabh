import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { connectMongoose } from "@/lib/db/mongoose";
import { Subscriber } from "@/lib/db/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SubscribeInput = z.object({
  email: z.string().trim().email("Valid email required").max(320),
  source: z.string().trim().max(80).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = SubscribeInput.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid email" },
        { status: 400 },
      );
    }

    await connectMongoose();

    const email = parsed.data.email.toLowerCase();
    const source = parsed.data.source ?? "footer";

    // Upsert: re-subscribe if previously unsubscribed, otherwise insert.
    const result = await Subscriber.findOneAndUpdate(
      { email },
      {
        $setOnInsert: { email, source, createdAt: new Date() },
        $set: { unsubscribed: false, updatedAt: new Date() },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return NextResponse.json({
      ok: true,
      alreadySubscribed: result.createdAt.getTime() !== result.updatedAt.getTime(),
    });
  } catch (err) {
    console.error("[/api/subscribe]", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
