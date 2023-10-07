import { ICartItem } from "@/lib/models";
import { useCart } from "@/lib/contexts/cart-context";

import * as S from "./style";
import { formatPrice } from "@/lib/utils";

interface IProps {
  item: ICartItem;
}

export default function CartItem({ item }: IProps) {
  const { removeItem, increaseItemQuantity, decreaseItemQuantity } = useCart();
  const { product, variation, quantity } = item;

  const handleRemoveItem = () => removeItem(item);
  const handleIncreaseItemQuantity = () => increaseItemQuantity(item);
  const handleDecreaseItemQuantity = () => decreaseItemQuantity(item);

  return (
    <S.Container>
      <S.DeleteButton
        onClick={handleRemoveItem}
        title="remove product from cart"
      />
      <S.Image src={product.thumbnail} alt={product.name} />
      <S.Details>
        <S.Title>{product.name}</S.Title>
        <S.Desc>
          {variation.name} <br />
          Quantity: {quantity}
        </S.Desc>
      </S.Details>
      <S.Price>
        <p>{formatPrice(variation.price)}</p>
        <div>
          <S.ChangeQuantity
            onClick={handleDecreaseItemQuantity}
            disabled={quantity === 1}
          >
            -
          </S.ChangeQuantity>
          <S.ChangeQuantity onClick={handleIncreaseItemQuantity}>
            +
          </S.ChangeQuantity>
        </div>
      </S.Price>
    </S.Container>
  );
}
