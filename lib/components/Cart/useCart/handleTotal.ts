import { PRODUCTS, getVariation } from "@/lib/client-config";
import { ICartItem, ICartTotal } from "@/lib/models";

export function updateCartTotal(items: ICartItem[]): ICartTotal {
  const quantity = items.reduce((sum: number, item: ICartItem) => {
    sum += item.quantity;
    return sum;
  }, 0);
  const price = items.reduce((sum: number, item: ICartItem) => {
    sum += getVariation(item.productId, item.variationId).price * item.quantity;
    return sum;
  }, 0);

  return {
    price,
    quantity,
  };
}
