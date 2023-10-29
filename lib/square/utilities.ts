import { SQUARE_LOCATION_ID } from "@/lib/config";
import { client, genErrorResult, genOrderData } from "./square";
import { IInventoryCount, SquareResult } from "@/lib/models";

export async function getInventoryCounts(
  variationIds: string[]
): Promise<SquareResult> {
  try {
    const abort = () => {
      throw Error("Invalid Inventory Response");
    };

    const { result } = await client.inventoryApi.batchRetrieveInventoryCounts({
      catalogObjectIds: variationIds,
      locationIds: [SQUARE_LOCATION_ID],
    });

    const countObjects = result?.counts ?? abort();
    const counts: IInventoryCount[] = countObjects.map((countObj) => {
      const id = countObj.catalogObjectId ?? abort();
      const count = parseInt(countObj.quantity ?? "0");
      return { id, count };
    });

    return { data: { counts } };
  } catch (error) {
    const zeros = new Array(variationIds.length);
    for (let i = 0; i < variationIds.length; ++i) zeros[i] = 0;
    return { data: { counts: zeros } };
  }
}

export async function getOrder(orderId: string): Promise<SquareResult> {
  try {
    const { result } = await client.ordersApi.retrieveOrder(orderId);

    return { data: genOrderData(result.order) };
  } catch (error) {
    return genErrorResult(error);
  }
}
