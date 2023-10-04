import {
  Client,
  Environment,
  OrderLineItem,
  CreateOrderResponse,
  RetrieveOrderResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
} from "square";
import {
  SQUARE_ACCESS_TOKEN,
  SQUARE_LOCATION_ID,
  CURRENCY,
} from "@/lib/config";
import { randomUUID } from "crypto";

const client = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

async function getOrder(orderId: string): Promise<RetrieveOrderResponse> {
  const { result } = await client.ordersApi.retrieveOrder(orderId);
  return result;
}

export async function createOrder(
  product_amounts: Record<string, number>
): Promise<CreateOrderResponse> {
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

  return result;
}

export async function createPayment(
  sourceId: string,
  orderId: string
): Promise<CreatePaymentResponse> {
  const { order, errors } = await getOrder(orderId);
  if (errors !== undefined) {
    return { errors: errors };
  }

  const { result } = await client.paymentsApi.createPayment({
    idempotencyKey: randomUUID(),
    sourceId: sourceId,
    amountMoney: {
      currency: CURRENCY,
      amount: order?.netAmountDueMoney?.amount,
    },
    orderId: orderId,
  });
  return result;
}
