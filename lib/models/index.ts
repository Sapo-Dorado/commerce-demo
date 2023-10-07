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
  variations: Variation[];
}

export interface Order {
  id: string;
  price: number;
}

export interface ICartItem {
  product: Product;
  variation: Variation;
  quantity: number;
}

export interface ICartTotal {
  price: number;
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  setIsOpen(state: boolean): void;
  total: ICartTotal;
  setTotal(state: ICartTotal): void;
  items: ICartItem[];
  setItems(state: ICartItem[]): void;
}
