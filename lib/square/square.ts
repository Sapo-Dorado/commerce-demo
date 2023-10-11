import { SQUARE_ACCESS_TOKEN, getProductId, getVariation } from "@/lib/config";
import { ApiError, Client, Environment, Order } from "square";
import { ICartItem, OrderData, SquareResult } from "@/lib/models";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export const client = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

export function genOrderData(order?: Order): OrderData {
  const abort = () => {
    throw Error("Order Item missing necessary parameters");
  };

  const id = order?.id ?? abort();
  const amount = order?.netAmountDueMoney?.amount ?? abort();

  const items =
    order?.lineItems?.map((item): ICartItem => {
      const variationId = item.catalogObjectId ?? abort();
      return {
        variationId,
        productId: getProductId(variationId),
        quantity: parseInt(item.quantity),
      };
    }) ?? abort();
  return {
    id,
    price: parseInt(amount.toString()),
    items,
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
