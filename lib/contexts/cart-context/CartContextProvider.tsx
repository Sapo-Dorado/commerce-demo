"use client";
import { createContext, useContext, useState } from "react";
import { ICartContext, ICartItem, ICartTotal } from "@/lib/models";

const CartContext = createContext<ICartContext | undefined>(undefined);

const useCartContext = (): ICartContext => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
};
const defaultTotal: ICartTotal = {
  price: 0,
  quantity: 0,
};

const CartProvider = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState<ICartTotal>(defaultTotal);
  const [items, setItems] = useState<ICartItem[]>([]);

  const CartContextValue: ICartContext = {
    isOpen,
    setIsOpen,
    total,
    setTotal,
    items,
    setItems,
  };

  // return CartContext.Provider({ value: CartContextValue });
  return <CartContext.Provider value={CartContextValue} {...props} />;
};

export { CartProvider, useCartContext };
