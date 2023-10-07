import { ICartItem } from "@/lib/models";
import CartItem from "./CartItem";

import * as S from "./style";

interface IProps {
  items: ICartItem[];
}

const CartProducts = ({ items }: IProps) => {
  return (
    <S.Container>
      {items?.length ? (
        items.map((i) => <CartItem item={i} key={i.variation.id} />)
      ) : (
        <S.CartProductsEmpty>Your cart is empty!</S.CartProductsEmpty>
      )}
    </S.Container>
  );
};

export default CartProducts;
