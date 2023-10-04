import { NextRequest, NextResponse } from "next/server";
import { createPayment } from "@/lib/square";
import { handleErrors } from "@/lib/util";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { sourceId, orderId } = await req.json();
  const { payment, errors } = await createPayment(sourceId, orderId);
  if (errors !== undefined) {
    return handleErrors(errors);
  }

  // If errors is undefined payment should be defined
  return NextResponse.json({ data: { id: payment?.id } }, { status: 200 });

}