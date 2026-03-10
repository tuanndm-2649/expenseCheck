import { NextResponse } from "next/server";
import { deleteFund, getFunds, updateFund } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = (await req.json()) as { name?: string; add_amount?: number };
    const id = params.id;

    const funds = await getFunds();
    const current = funds.find((item) => item.id === id);
    if (!current) {
      return NextResponse.json({ error: "Fund not found" }, { status: 404 });
    }

    const patch: { name?: string; balance?: number } = {};

    if (typeof body.name === "string") {
      patch.name = body.name.trim();
    }

    if (typeof body.add_amount === "number") {
      if (body.add_amount <= 0) {
        return NextResponse.json(
          { error: "Top-up amount must be greater than 0" },
          { status: 400 },
        );
      }
      patch.balance = Number(current.balance) + body.add_amount;
    }

    if (!patch.name && typeof patch.balance !== "number") {
      return NextResponse.json(
        { error: "No update payload provided" },
        { status: 400 },
      );
    }

    const updated = await updateFund(id, patch);
    return NextResponse.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const status = /duplicate|unique/i.test(message) ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  try {
    const funds = await getFunds();
    const current = funds.find((item) => item.id === params.id);
    if (!current) {
      return NextResponse.json({ error: "Fund not found" }, { status: 404 });
    }

    if (Number(current.balance) > 0) {
      return NextResponse.json(
        { error: "Cannot delete a fund with remaining balance" },
        { status: 400 },
      );
    }

    await deleteFund(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 500 },
    );
  }
}
