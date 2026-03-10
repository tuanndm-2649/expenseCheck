import { NextResponse } from "next/server";
import { getSummary } from "@/lib/db";
import { toMonthInput } from "@/lib/format";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month") ?? toMonthInput();
    const summary = await getSummary(month);
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 500 },
    );
  }
}
