import { OrderLineItem } from "square";
import { randomUUID } from "crypto";
import {
  SQUARE_LOCATION_ID,
  CURRENCY,
  getVariation,
  getProductId,
  getProductById,
} from "@/lib/config";
import { IOrderData, IOrderItem, SquareResult } from "@/lib/models";
import { client, genErrorResult, genOrderData } from "./square";
import { getInventoryCounts } from "./utilities";

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
  const abort = () => {
    throw Error("Invalid Order");
  };

  try {
    const { result: orderResult } = await client.ordersApi.retrieveOrder(
      orderId
    );

    const order = orderResult?.order ?? abort();

    // Check order doesn't exceed inventory
    const quantities: Record<string, number> =
      order.lineItems?.reduce(
        (pre, item) => ({
          ...pre,
          [item.catalogObjectId ?? abort()]: parseInt(item.quantity),
        }),
        {}
      ) ?? abort();
    const ids = Object.keys(quantities);
    const counts = (await getInventoryCounts(ids)).data?.counts ?? abort();

    ids.map((id, i) => {
      if (quantities[id] > counts[i]) {
        const product = getProductById(getProductId(id));
        const variation = getVariation(product.id, id);
        throw Error(
          `${product.name} doesn't have sufficient stock of ${variation.name} to fulfill your order, please remove it from your cart`
        );
      }
    });

    const price = order.netAmountDueMoney?.amount ?? abort();
    const { result: paymentResult } = await client.paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: sourceId,
      amountMoney: {
        currency: CURRENCY,
        amount: price,
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

export async function removeItemsFromOrder(
  order: IOrderData,
  itemsToRemove: IOrderItem[]
): Promise<SquareResult> {
  try {
    const { result } = await client.ordersApi.updateOrder(order.id, {
      idempotencyKey: randomUUID(),
      order: {
        locationId: SQUARE_LOCATION_ID,
        version: order.version,
      },
      fieldsToClear: itemsToRemove.map((item) => `line_items[${item.uid}]`),
    });

    return {
      data: genOrderData(result.order),
    };
  } catch (error) {
    return genErrorResult(error);
  }
}
