import { OrderLineItem } from "square";
import { randomUUID } from "crypto";
import { SQUARE_LOCATION_ID, CURRENCY } from "@/lib/config";
import { SquareResult } from "@/lib/models";
import { client, genErrorResult, genOrderData } from "./square";

export async function createOrder(
  product_amounts: Record<string, number>
): Promise<SquareResult> {
  try {
    const items = Object.entries(product_amounts).map(
      ([variationId, amount]): OrderLineItem => {
        return {
          quantity: amount.toString(),
          catalogObjectId: variationId,
        };
      }
    );

    const { result } = await client.ordersApi.createOrder({
      order: {
        locationId: SQUARE_LOCATION_ID,
        lineItems: items,
      },
      idempotencyKey: randomUUID(),
    });

    return {
      data: genOrderData(result.order),
    };
  } catch (error) {
    return genErrorResult(error);
  }
}

export async function createPayment(
  sourceId: string,
  orderId: string
): Promise<SquareResult> {
  try {
    const { result: orderResult } = await client.ordersApi.retrieveOrder(
      orderId
    );

    const { result: paymentResult } = await client.paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: sourceId,
      amountMoney: {
        currency: CURRENCY,
        amount: orderResult?.order?.netAmountDueMoney?.amount,
      },
      orderId: orderId,
    });
    if (!paymentResult?.payment?.id) {
      throw Error("Invalid payment");
    }
    return { data: { id: paymentResult?.payment?.id } };
  } catch (error) {
    return genErrorResult(error);
  }
}
