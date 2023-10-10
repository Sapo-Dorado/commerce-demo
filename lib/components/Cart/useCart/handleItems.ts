import { ICartItem } from "@/lib/models";

function updateQuantitySafely(
  currentItem: ICartItem,
  targetItem: ICartItem,
  quantity: number
): ICartItem {
  if (currentItem.variationId === targetItem.variationId) {
    return {
      productId: currentItem.productId,
      variationId: currentItem.variationId,
      quantity: currentItem.quantity + quantity,
    };
  } else {
    return currentItem;
  }
}

export function addItem(items: ICartItem[], newItem: ICartItem): ICartItem[] {
  const isItemAlreadyInCart = items.some(
    (item: ICartItem) => newItem.variationId === item.variationId
  );

  if (isItemAlreadyInCart) {
    return items.map((item: ICartItem) => {
      return updateQuantitySafely(item, newItem, newItem.quantity);
    });
  } else {
    return [...items, newItem];
  }
}

export function removeItem(
  items: ICartItem[],
  itemToRemove: ICartItem
): ICartItem[] {
  return items.filter(
    (item: ICartItem) => item.variationId !== itemToRemove.variationId
  );
}

export function increaseItemQuantity(
  items: ICartItem[],
  itemToIncrease: ICartItem
): ICartItem[] {
  return items.map((item: ICartItem) => {
    return updateQuantitySafely(item, itemToIncrease, +1);
  });
}

export function decreaseItemQuantity(
  items: ICartItem[],
  itemToDecrease: ICartItem
): ICartItem[] {
  return items.map((item: ICartItem) => {
    return updateQuantitySafely(item, itemToDecrease, -1);
  });
}
