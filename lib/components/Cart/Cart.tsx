"use client";
import useCart from "./useCart";
import { formatPrice } from "@/lib/utils";
import CartItems from "./CartItems";
import { useRouter } from "next/navigation";
import {
  ICartItem,
  ICartState,
  ICartTotal,
  defaultCartTotal,
} from "@/lib/models";
import { useEffect, useState } from "react";
import * as S from "./style";

export default function Cart() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [total, setTotal] = useState<ICartTotal>(defaultCartTotal);
  const [items, setItems] = useState<ICartItem[]>([]);
  const [stateTotal, stateItems] = useCart((state: ICartState) => [
    state.total,
    state.items,
  ]);
  useEffect(() => {
    setItems(stateItems);
    setTotal(stateTotal);
  }, [stateItems]);

  const [createOrder, clearCart] = useCart((state: ICartState) => [
    state.createOrder,
    state.clearCart,
  ]);

  const toggleCart = () => setIsOpen(!isOpen);
  const router = useRouter();

  const handleCheckout = async () => {
    if (total.quantity == 0) {
      return;
    }
    const { data: order } = await createOrder();
    clearCart();
    router.push(`/shop/checkout/${order.id}`);
  };

  return (
    <S.Container isOpen={isOpen}>
      <S.CartButton onClick={toggleCart}>
        {isOpen ? (
          <span>X</span>
        ) : (
          <S.CartIcon>
            <S.CartQuantity title="Products in cart quantity">
              {total.quantity}
            </S.CartQuantity>
          </S.CartIcon>
        )}
      </S.CartButton>

      {isOpen && (
        <S.CartContent>
          <S.CartContentHeader>
            <S.CartIcon large>
              <S.CartQuantity>{total.quantity}</S.CartQuantity>
            </S.CartIcon>
            <S.HeaderTitle>Cart</S.HeaderTitle>
          </S.CartContentHeader>
          <CartItems items={items} />
          <S.CartFooter>
            <S.Sub>SUBTOTAL</S.Sub>
            <S.SubPrice>
              <S.SubPriceValue>{`${formatPrice(total.price)}`}</S.SubPriceValue>
            </S.SubPrice>
            {total.quantity !== 0 ? (
              <S.CheckoutButton onClick={handleCheckout} autoFocus>
                Checkout
              </S.CheckoutButton>
            ) : (
              <S.DisabledCheckoutButton>Checkout</S.DisabledCheckoutButton>
            )}
          </S.CartFooter>
        </S.CartContent>
      )}
    </S.Container>
  );
}
