import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/square";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { productAmounts } = await req.json();
  const { data, errors } = await createOrder(productAmounts);
  if (errors !== undefined) {
    return NextResponse.json({errors: errors}, { status: 500 });
  }

  // If errors is undefined order should be defined
  return NextResponse.json({ data: data }, { status: 200 });
}
