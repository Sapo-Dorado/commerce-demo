"use client";
import { useCart } from "@/lib/contexts/cart-context";
import { formatPrice } from "@/lib/utils";
import * as S from "./style";
import CartItems from "./CartItems";

const Cart = () => {
  const { isOpen, openCart, closeCart, total, items } = useCart();

  const handleCheckout = () => {
    if (total.quantity > 0) {
      alert(`Checkout - Subtotal: ${formatPrice(total.price)}`);
    }
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
};

export default Cart;
