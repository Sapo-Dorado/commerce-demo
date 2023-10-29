import { NextRequest, NextResponse } from "next/server";
import { createPayment } from "@/lib/square";

interface IProps {
  sourceId: string;
  orderId: string;
}

// Assumption: If there are errors, info field will include the updated order data
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { sourceId, orderId }: IProps = await req.json();
  const { data, errors, info } = await createPayment(sourceId, orderId);
  if (errors !== undefined) {
    return NextResponse.json({ errors, info }, { status: 500 });
  }

  // If errors is undefined payment should be defined
  return NextResponse.json({ data: data }, { status: 200 });
}
