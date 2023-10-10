import { ICartItem, ICartState, defaultCartTotal } from "@/lib/models";
import {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "./handleItems";
import { updateCartTotal } from "./handleTotal";
import { createOrder } from "./handleOrder";
import { create } from "zustand";
import { persist } from "zustand/middleware";

function updatedItems(newItems: ICartItem[]) {
  return {
    items: newItems,
    total: updateCartTotal(newItems),
  };
}

const useCart = create<ICartState>()(
  persist(
    (set, get): ICartState => ({
      total: defaultCartTotal,
      items: [],
      isOpen: false,
      addItem: (newItem: ICartItem) =>
        set((state: ICartState) => updatedItems(addItem(state.items, newItem))),
      removeItem: (itemToRemove: ICartItem) =>
        set((state: ICartState) =>
          updatedItems(removeItem(state.items, itemToRemove))
        ),
      increaseItemQuantity: (itemToIncrease: ICartItem) =>
        set((state: ICartState) =>
          updatedItems(increaseItemQuantity(state.items, itemToIncrease))
        ),
      decreaseItemQuantity: (itemToDecrease: ICartItem) =>
        set((state: ICartState) =>
          updatedItems(decreaseItemQuantity(state.items, itemToDecrease))
        ),
      clearCart: () => set(() => updatedItems([])),
      toggleCart: () =>
        set((state) => ({
          isOpen: !state.isOpen,
        })),
      createOrder: async () => await createOrder(get().items),
    }),
    { name: "items" }
  )
);

export default useCart;
