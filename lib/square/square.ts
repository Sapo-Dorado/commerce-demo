import { SQUARE_ACCESS_TOKEN } from "@/lib/config";
import { ApiError, Client, Environment, Order } from "square";
import { OrderData, SquareResult } from "@/lib/models";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export const client = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

export function genOrderData(order?: Order): OrderData {
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
