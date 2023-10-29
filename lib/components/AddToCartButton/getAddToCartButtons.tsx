import { Product } from "@/lib/models";
import AddToCartButton from "./AddToCartButton";
import VariationContent from "./VariationContent";
import { getInventoryCounts } from "@/lib/square";
import { ReactElement, cache } from "react";

interface InventoryResult {
  variationIds: string[];
  inventoryCounts: number[];
}
const fetchInventoryCounts = cache(
  async (product: Product): Promise<InventoryResult> => {
    const variationIds = Object.keys(product.variations);
    return {
      variationIds,
      inventoryCounts: (await getInventoryCounts(variationIds)).data.counts,
    };
  }
);

// Should not be called by a client component
export async function getAddToCartButtons(
  product: Product
): Promise<Record<string, ReactElement>> {
  const { variationIds, inventoryCounts } = await fetchInventoryCounts(product);

  const buttons = variationIds.map((variationId, i) => {
    const count = inventoryCounts[i];
    const variation = product.variations[variationId];
    return (
      <AddToCartButton
        product={product}
        variation={variation}
        disabled={count <= 0}
        content={
          <VariationContent variation={variation} inventoryCount={count} />
        }
        key={variationId}
      />
    );
  });

  return buttons.reduce(
    (pre, button, i) => ({
      ...pre,
      [variationIds[i]]: button,
    }),
    {}
  );
}
