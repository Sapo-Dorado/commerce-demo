import { PRODUCTS, getVariation } from "@/lib/client-config";
import { ICartItem, ICartTotal } from "@/lib/models";
import { calculatePrice } from "@/lib/client-config";

export function updateCartTotal(items: ICartItem[]): ICartTotal {
  const quantity = items.reduce((sum: number, item: ICartItem) => {
    sum += item.quantity;
    return sum;
  }, 0);
  const price = calculatePrice(items);

  return {
    price,
    quantity,
  };
}
