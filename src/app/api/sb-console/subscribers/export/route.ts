import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/db/mongoose";
import { Subscriber } from "@/lib/db/models";
import { requireAdmin } from "@/lib/auth-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  await requireAdmin();
  await connectMongoose();

  const docs = await Subscriber.find({ unsubscribed: { $ne: true } })
    .sort({ createdAt: -1 })
    .lean();

  const header = ["email", "source", "createdAt"];
  const lines = [header.join(",")];
  for (const d of docs) {
    lines.push(
      [
        csvEscape(d.email),
        csvEscape(d.source ?? ""),
        csvEscape(
          d.createdAt instanceof Date
            ? d.createdAt.toISOString()
            : String(d.createdAt ?? ""),
        ),
      ].join(","),
    );
  }
  const csv = lines.join("\n");

  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
