import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/square";
import { IOrderData, SquareResult } from "@/lib/models";

interface IProps {
  productAmounts: Record<string, number>
}

export async function POST(req: NextRequest): Promise<NextResponse<SquareResult<IOrderData>>> {
  const { productAmounts }: IProps = await req.json();
  const { data, errors } = await createOrder(productAmounts);
  if (errors !== undefined) {
    return NextResponse.json({errors: errors}, { status: 500 });
  }

  // If errors is undefined order should be defined
  return NextResponse.json({ data: data }, { status: 200 });
}
