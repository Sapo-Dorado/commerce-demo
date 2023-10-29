import { Product, Variation } from "@/lib/models";
import { getInventoryCounts } from "@/lib/square";
import ClientAddToCartButton from "./ClientAddToCartButton";
import VariationContent from "./VariationContent";

async function fetchInventoryCount(variationId: string) {
  return (await getInventoryCounts([variationId])).data.counts[0];
}

interface IProps {
  product: Product;
  variation: Variation;
}

// Should not be rendered by a client component
export default async function AddToCartButton({ product, variation }: IProps) {
  const count = await fetchInventoryCount(variation.id);
  return (
    <ClientAddToCartButton
      product={product}
      variation={variation}
      disabled={count <= 0}
      content={
        <VariationContent variation={variation} inventoryCount={count} />
      }
    />
  );
}
