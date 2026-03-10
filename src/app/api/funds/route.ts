import { NextResponse } from "next/server";
import { createFund, getFunds } from "@/lib/db";

export async function GET() {
  try {
    const funds = await getFunds();
    return NextResponse.json(funds);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { name?: string };
    const name = body.name?.trim();
    if (!name) {
      return NextResponse.json(
        { error: "Fund name is required" },
        { status: 400 },
      );
    }

    const fund = await createFund(name);
    return NextResponse.json(fund, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const status = /duplicate|unique/i.test(message) ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
