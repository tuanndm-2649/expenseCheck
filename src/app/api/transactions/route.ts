import { NextResponse } from "next/server";
import { createTransaction, getTransactions } from "@/lib/db";
import { toMonthInput } from "@/lib/format";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month") ?? toMonthInput();
    const transactions = await getTransactions(month);
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      type?: "income" | "expense";
      amount?: number;
      date?: string;
      note?: string | null;
    };

    if (!body.type || typeof body.amount !== "number" || !body.date) {
      return NextResponse.json(
        { error: "type, amount, and date are required" },
        { status: 400 },
      );
    }

    if (body.amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be greater than 0" },
        { status: 400 },
      );
    }

    const created = await createTransaction({
      type: body.type,
      amount: body.amount,
      date: body.date,
      note: body.note ?? null,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 500 },
    );
  }
}
