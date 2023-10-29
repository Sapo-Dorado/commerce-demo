import { IInventoryCount, Product } from "@/lib/models";
import AddToCartButton from "./AddToCartButton";
import VariationContent from "./VariationContent";
import { getInventoryCounts } from "@/lib/square";
import { ReactElement, cache } from "react";
import { zeros } from "@/lib/utils";

const fetchInventoryCounts = cache(
  async (product: Product): Promise<IInventoryCount[]> => {
    const variations = Object.keys(product.variations);
    return (await getInventoryCounts(variations)).data
      ?.counts ?? zeros(variations.length);
  }
);

// Should not be called by a client component
export async function getAddToCartButtons(
  product: Product
): Promise<Record<string, ReactElement>> {
  const counts = await fetchInventoryCounts(product);
  const buttons = counts.map(({ id: variationId, count }) => {
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
      [counts[i].id]: button,
    }),
    {}
  );
}
