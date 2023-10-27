import { NextRequest, NextResponse } from "next/server";
import { removeItemsFromOrder } from "@/lib/square";
import { IOrderData, IOrderItem } from "@/lib/models";
import { it } from "node:test";

interface IProps {
  order: IOrderData;
  itemsToRemove: IOrderItem[];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { order, itemsToRemove }: IProps = await req.json();
  const { data, errors } = await removeItemsFromOrder(order, itemsToRemove);
  if (errors !== undefined) {
    return NextResponse.json({ errors: errors }, { status: 500 });
  }

  // If errors is undefined order should be defined
  return NextResponse.json({ data: data }, { status: 200 });
}
