"use client";

import { ICartItem, ICartState, Product, Variation } from "@/lib/models";
import useCart from "@/lib/components/Cart/useCart";
import { ReactElement } from "react";

interface ContentProps {}
interface IProps {
  product: Product;
  variation: Variation;
  content: ReactElement<ContentProps>;
}

export default function AddToCartButton({
  product,
  variation,
  content,
}: IProps) {
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
      <div className="flex">
        {content}
        <h2 className="mb-3 text-2xl pl-5 font-medium h-fill">
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
      </div>
    </a>
  );
}
