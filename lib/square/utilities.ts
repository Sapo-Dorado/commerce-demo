import { SQUARE_LOCATION_ID } from "@/lib/config";
import { client, genErrorResult, genOrderData } from "./square";
import { SquareResult, Variation } from "@/lib/models";

export async function getInventoryCount(
  variationId: string
): Promise<SquareResult> {
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
