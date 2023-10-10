"use client";

import { ICartItem, ICartState, Product, Variation } from "@/lib/models";
import useCart from "@/lib/components/Cart/useCart";

interface IProps {
  product: Product;
  variation: Variation;
}

export default function AddToCartButton({ product, variation }: IProps) {
  const addItem = useCart((state: ICartState) => state.addItem);
  const item: ICartItem = {
    productId: product.id,
    variationId: variation.id,
    quantity: 1,
  };
  return (
    <a
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      style={{ cursor: "pointer" }}
      onClick={() => addItem(item)}
    >
      <h2 className={`mb-3 text-2xl font-semibold`}>
        Add Item To Cart
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
    </a>
  );
}
