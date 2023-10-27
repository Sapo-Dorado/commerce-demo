import { NextRequest, NextResponse } from "next/server";
import { createPayment } from "@/lib/square";

interface IProps {
  sourceId: string;
  orderId: string;
}
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { sourceId, orderId }: IProps = await req.json();
  const { data, errors } = await createPayment(sourceId, orderId);
  if (errors !== undefined) {
    return NextResponse.json({ errors: errors }, { status: 500 });
  }

  // If errors is undefined payment should be defined
  return NextResponse.json({ data: data }, { status: 200 });
}
