import { ICartItem } from "@/lib/models";
import CartItem from "./CartItem";

import * as S from "./style";

interface IProps {
  items: ICartItem[];
}

export default function CartProducts({ items }: IProps) {
  return (
    <S.Container>
      {items?.length ? (
        items.map((i) => <CartItem item={i} key={i.variation.id} />)
      ) : (
        <S.CartProductsEmpty>Your cart is empty!</S.CartProductsEmpty>
      )}
    </S.Container>
  );
}
