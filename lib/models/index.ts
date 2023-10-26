export interface Variation {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  thumbnail: string;
  variations: Record<string, Variation>;
}

export interface SquareResult {
  data?: any;
  errors?: string[];
}

export enum OrderState {
  Open,
  Completed,
  Unknown,
}

export interface OrderItem {
  uid: string;
  item: ICartItem;
}
export interface OrderData {
  id: string;
  orderItems: OrderItem[];
  price: number;
  state: OrderState;
  version: number;
}

export interface ICartItem {
  productId: string;
  variationId: string;
  quantity: number;
}

export interface ICartTotal {
  price: number;
  quantity: number;
}

export const defaultCartTotal: ICartTotal = {
  price: 0,
  quantity: 0,
};

export interface ICartState {
  total: ICartTotal;
  items: ICartItem[];
  addItem(newItem: ICartItem): void;
  removeItem(itemToRemove: ICartItem): void;
  increaseItemQuantity(itemToIncrease: ICartItem): void;
  decreaseItemQuantity(itemToDecrease: ICartItem): void;
  clearCart(): void;
  createOrder(): Promise<SquareResult>;
}
