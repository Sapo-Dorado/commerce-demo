import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/square";
import { handleErrors } from "@/lib/util";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { productAmounts } = await req.json();
  const { order, errors } = await createOrder(productAmounts);
  if (errors !== undefined) {
    return handleErrors(errors);
  }

  // If errors is undefined order should be defined
  return NextResponse.json({ data: { id: order?.id } }, { status: 200 });
}
