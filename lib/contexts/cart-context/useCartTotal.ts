import { useCartContext } from "./CartContextProvider";
import { ICartItem, ICartTotal } from "@/lib/models";

export default function useCartTotal() {
  const { total, setTotal } = useCartContext();

  const updateCartTotal = (items: ICartItem[]) => {
    const quantity = items.reduce((sum: number, item: ICartItem) => {
      sum += item.quantity;
      return sum;
    }, 0);
    const price = items.reduce((sum: number, item: ICartItem) => {
      sum += item.variation.price * item.quantity;
      return sum;
    }, 0);

    const total: ICartTotal = {
      price,
      quantity,
    };

    setTotal(total);
  };

  return {
    total,
    updateCartTotal,
  };
}
