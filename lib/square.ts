import { Client, Environment, OrderLineItem, ApiError } from "square";
import {
  SQUARE_ACCESS_TOKEN,
  SQUARE_LOCATION_ID,
  CURRENCY,
} from "@/lib/config";
import { randomUUID } from "crypto";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const client = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

interface SquareResult {
  data?: any;
  errors?: string[];
}

export function genErrorResult(error: any): SquareResult {
  const defaultError = ["Unknown Error Occurred"];
  var errors: string[] = defaultError;
  if (error instanceof ApiError) {
    errors =
      error.errors?.map((e) => e.detail ?? "Unknown Error") ?? defaultError;
  }

  return { errors: errors };
}

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
      data: {
        id: result?.order?.id,
        price: result?.order?.netAmountDueMoney?.amount,
      },
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
    return { data: { id: paymentResult?.payment?.id } };
  } catch (error) {
    return genErrorResult(error);
  }
}
