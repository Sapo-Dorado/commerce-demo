"use client";
import useCart from "./useCart";
import { formatPrice } from "@/lib/utils";
import CartItems from "./CartItems";
import { CartIcon } from "@/lib/components/icons";
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
  }, [stateItems, stateTotal]);

  const createOrder = useCart((state: ICartState) => state.createOrder);

  const toggleCart = () => setIsOpen(!isOpen);
  const router = useRouter();

  const handleCheckout = async () => {
    if (total.quantity == 0) {
      return;
    }
    const { data: order, errors } = await createOrder();
    if (order != undefined) {
      router.push(`/shop/checkout/${order.id}`);
    } else {
      console.log(errors);
      router.push(`/shop`);
    }
  };

  return (
    <S.Container isOpen={isOpen}>
      <S.CartButton onClick={toggleCart}>
        {isOpen ? (
          <span>X</span>
        ) : (
          <div className="relative flex justify-center items-center w-[50px] h-[50px]">
            <div className="h-[35px] w-[35px] mb-1">
              <CartIcon />
            </div>
            <S.CartQuantity title="Products in cart quantity">
              {total.quantity}
            </S.CartQuantity>
          </div>
        )}
      </S.CartButton>

      {isOpen && (
        <S.CartContent>
          <div className="flex py-[45px] justify-center text-white">
            <div className="relative inline-flex justify-center items-center w-[60px] h-[60px]">
              <div className="h-[40px] w-[40px] mb-1">
                <CartIcon />
              </div>
              <S.CartQuantity title="Products in cart quantity">
                {total.quantity}
              </S.CartQuantity>
            </div>
            <div className="flex items-center font-medium text-2xl h-fill">
              <span>Cart</span>
            </div>
          </div>
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
