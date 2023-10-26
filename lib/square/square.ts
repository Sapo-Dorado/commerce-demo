import { SQUARE_ACCESS_TOKEN, getProductId } from "@/lib/config";
import { ApiError, Client, Environment, Order } from "square";
import {
  IOrderData,
  IOrderItem,
  IOrderState,
  SquareResult,
} from "@/lib/models";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export const client = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

export function genOrderData(order?: Order): IOrderData {
  const abort = () => {
    throw Error("Order Item missing necessary parameters");
  };

  const handleState = (state: string) => {
    if (state == "COMPLETED") {
      return IOrderState.Completed;
    } else if (state == "OPEN") {
      return IOrderState.Open;
    } else {
      return IOrderState.Unknown;
    }
  };

  const id = order?.id ?? abort();
  const amount = order?.netAmountDueMoney?.amount ?? abort();

  const orderState = order?.state ?? abort();
  const version = order?.version ?? abort();

  const orderItems =
    order?.lineItems?.map((item): IOrderItem => {
      const variationId = item.catalogObjectId ?? abort();
      return {
        item: {
          variationId,
          productId: getProductId(variationId),
          quantity: parseInt(item.quantity),
        },
        uid: item.uid ?? abort(),
      };
    }) ?? abort();
  return {
    id,
    price: parseInt(amount.toString()),
    orderItems,
    state: handleState(orderState),
    version,
  };
}

export function genErrorResult(error: any): SquareResult {
  const defaultError = ["Unknown Error Occurred"];
  var errors: string[] = defaultError;
  if (error instanceof ApiError) {
    errors =
      error.errors?.map((e) => e.detail ?? "Unknown Error") ?? defaultError;
  } else if (error instanceof Error) {
    errors = [error.message];
  }

  return { errors: errors };
}
