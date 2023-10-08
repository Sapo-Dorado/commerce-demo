import { Client, Environment, OrderLineItem, ApiError, Order } from "square";
import { SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID, CURRENCY } from "./config";
import { randomUUID } from "crypto";
import { OrderData } from "./models";

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

function genOrderData(order?: Order): OrderData {
  const id = order?.id;
  const amount = order?.netAmountDueMoney?.amount;
  if (!(id && amount)) {
    throw Error("Order missing necessary parameters");
  }
  return {
    id,
    price: parseInt(amount.toString()),
  };
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

export async function getInventoryCount(variationId: string) {
  try {
    const { result } = await client.inventoryApi.retrieveInventoryCount(
      variationId,
      SQUARE_LOCATION_ID
    );

    const counts = result?.counts;
    if (!counts) {
      throw Error("Counts not defined");
    }
    const count = counts[0].quantity;
    if (!count) {
      throw Error("Counts not defined");
    }

    return { data: { count: count.toString() } };
  } catch (error) {
    return { data: { count: "Unknown" } };
  }
}

export async function getOrder(orderId: string) {
  try {
    const { result } = await client.ordersApi.retrieveOrder(orderId);

    return { data: genOrderData(result.order) };
  } catch (error) {
    return genErrorResult(error);
  }
}
