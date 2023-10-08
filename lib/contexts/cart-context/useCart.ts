import { useCartContext } from "./CartContextProvider";
import useCartItems from "./useCartItems";
import useCartTotal from "./useCartTotal";

export function useCart() {
  const { isOpen, setIsOpen } = useCartContext();
  const {
    items,
    addItem,
    removeItem,
    increaseItemQuantity,
    decreaseItemQuantity,
  } = useCartItems();
  const { total, updateCartTotal } = useCartTotal();

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const createOrder = async () => {
    const productAmounts = items.reduce((pre, item) => {
      return {
        ...pre,
        [item.variation.id]: item.quantity,
      };
    }, {});

    const result = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        productAmounts: productAmounts,
      }),
    });
    return await result.json();
  };

  return {
    isOpen,
    openCart,
    closeCart,
    items,
    addItem,
    removeItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    total,
    updateCartTotal,
    createOrder,
  };
}
