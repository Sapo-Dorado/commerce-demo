import { useCartContext } from "./CartContextProvider";
import useCartTotal from "./useCartTotal";
import { ICartItem } from "@/lib/models";

const useCartItems = () => {
  const { items, setItems } = useCartContext();
  const { updateCartTotal } = useCartTotal();

  const updateQuantitySafely = (
    currentItem: ICartItem,
    targetItem: ICartItem,
    quantity: number
  ): ICartItem => {
    if (currentItem.variation.id === targetItem.variation.id) {
      return {
        product: currentItem.product,
        variation: currentItem.variation,
        quantity: currentItem.quantity + quantity,
      };
    } else {
      return currentItem;
    }
  };

  const addItem = (newItem: ICartItem) => {
    let updatedItems;
    const isItemAlreadyInCart = items.some(
      (item: ICartItem) => newItem.variation.id === item.variation.id
    );

    if (isItemAlreadyInCart) {
      updatedItems = items.map((item: ICartItem) => {
        return updateQuantitySafely(item, newItem, newItem.quantity);
      });
    } else {
      updatedItems = [...items, newItem];
    }

    setItems(updatedItems);
    updateCartTotal(updatedItems);
  };

  const removeItem = (itemToRemove: ICartItem) => {
    const updatedItems = items.filter(
      (item: ICartItem) => item.variation.id !== itemToRemove.variation.id
    );

    setItems(updatedItems);
    updateCartTotal(updatedItems);
  };

  const increaseItemQuantity = (itemToIncrease: ICartItem) => {
    const updatedItems = items.map((item: ICartItem) => {
      return updateQuantitySafely(item, itemToIncrease, +1);
    });

    setItems(updatedItems);
    updateCartTotal(updatedItems);
  };

  const decreaseItemQuantity = (itemToDecrease: ICartItem) => {
    const updatedItems = items.map((item: ICartItem) => {
      return updateQuantitySafely(item, itemToDecrease, -1);
    });

    setItems(updatedItems);
    updateCartTotal(updatedItems);
  };

  return {
    items,
    addItem,
    removeItem,
    increaseItemQuantity,
    decreaseItemQuantity,
  };
};

export default useCartItems;
