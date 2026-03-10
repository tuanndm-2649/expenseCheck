import { NextResponse } from "next/server";
import { deleteTransaction } from "@/lib/db";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  try {
    await deleteTransaction(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 500 },
    );
  }
}
