import { Product, Variation } from "@/lib/models";
import ClientAddToCartButton from "./ClientAddToCartButton";
import VariationContent from "./VariationContent";

interface IProps {
  product: Product;
  variation: Variation;
}

// Should not be rendered by a client component
export default function AddToCartButton({ product, variation }: IProps) {
  return (
    <ClientAddToCartButton
      product={product}
      variation={variation}
      content={<VariationContent variation={variation} />}
    />
  );
}
