"use client";
import { useCart } from "@/lib/contexts/cart-context";
import { formatPrice } from "@/lib/utils";
import * as S from "./style";
import CartItems from "./CartItems";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { isOpen, openCart, closeCart, createOrder, total, items } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    if (total.quantity == 0) {
      return;
    }
    const { data: order } = await createOrder();
    router.push(`/shop/checkout/${order.id}`);
  };

  const handleToggleCart = (isOpen: boolean) => () =>
    isOpen ? closeCart() : openCart();

  return (
    <S.Container isOpen={isOpen}>
      <S.CartButton onClick={handleToggleCart(isOpen)}>
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
