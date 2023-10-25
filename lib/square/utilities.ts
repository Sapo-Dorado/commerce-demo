import { SQUARE_LOCATION_ID } from "@/lib/config";
import { client, genErrorResult, genOrderData } from "./square";
import { SquareResult } from "@/lib/models";

export async function getInventoryCounts(
  variationIds: string[]
): Promise<SquareResult> {
  try {
    const { result } = await client.inventoryApi.batchRetrieveInventoryCounts({
      catalogObjectIds: variationIds,
      locationIds: [SQUARE_LOCATION_ID],
    });

    const countObjects = result?.counts;
    if (!countObjects) {
      throw Error("Counts not defined");
    }
    const counts = countObjects.map((count) => count.quantity ?? 0);

    return { data: { counts } };
  } catch (error) {
    const zeros = new Array(variationIds.length);
    for (let i = 0; i < variationIds.length; ++i) zeros[i] = 0;
    return { data: { counts: zeros } };
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
