import { NextRequest, NextResponse } from "next/server";
import { createPayment } from "@/lib/square";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { sourceId, orderId } = await req.json();
  const { data, errors } = await createPayment(sourceId, orderId);
  if (errors !== undefined) {
    return NextResponse.json(errors, { status: 500 });
  }

  // If errors is undefined payment should be defined
  return NextResponse.json({ data: data }, { status: 200 });
}
