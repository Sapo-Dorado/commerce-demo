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

interface SquareCatalogVariation {
  id: string;
  price: number;
}

interface SquareCatalogProduct {
  id: string;
  variations: SquareCatalogVariation[];
}

export async function getCatalog(): Promise<SquareCatalogProduct[]> {
  try {
    const { result } = await client.catalogApi.listCatalog();
    if (!result.objects) {
      throw Error("Bad Response");
    }

    return result.objects.map(
      (product): SquareCatalogProduct => ({
        id: product.id,
        variations:
          product.itemData?.variations?.reduce(
            (
              variationList: SquareCatalogVariation[],
              variation
            ): SquareCatalogVariation[] => {
              const price = variation.itemVariationData?.priceMoney;
              if (price) {
                variationList.push({
                  id: variation.id,
                  // price: parseInt(variation.itemVariationData?.priceMoney?.amount?.toString()),
                  price: 0,
                });
              }
              return variationList;
            },
            []
          ) ?? [],
      })
    );
  } catch (error) {
    const { errors } = genErrorResult(error);
    console.log(errors);
    return [];
  }
}
