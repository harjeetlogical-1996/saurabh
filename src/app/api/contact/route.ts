import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { connectMongoose } from "@/lib/db/mongoose";
import { Contact } from "@/lib/db/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ContactInput = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Valid email required").max(320),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = ContactInput.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid input",
          issues: parsed.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 },
      );
    }

    await connectMongoose();
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";

    const created = await Contact.create({
      ...parsed.data,
      userAgent: req.headers.get("user-agent") || "",
      ip,
    });

    return NextResponse.json({ ok: true, id: created._id.toString() });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
