import { useCartContext } from "./CartContextProvider";
import useCartItems from "./useCartItems";
import useCartTotal from "./useCartTotal";

const useCart = () => {
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
  };
};

export { useCart };
