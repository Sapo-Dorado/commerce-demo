import { ICartItem, ICartState } from "@/lib/models";
import useCart from "../../useCart";

import * as S from "./style";
import { formatPrice } from "@/lib/utils";
import { getProductById } from "@/lib/client-config";
import Image from "next/image";

interface IProps {
  item: ICartItem;
}

export default function CartItem({ item }: IProps) {
  const [removeItem, increaseItemQuantity, decreaseItemQuantity] = useCart(
    (state: ICartState) => [
      state.removeItem,
      state.increaseItemQuantity,
      state.decreaseItemQuantity,
    ]
  );
  const { productId, variationId, quantity } = item;
  const product = getProductById(productId);
  const variation = product.variations[variationId];

  const handleRemoveItem = () => removeItem(item);
  const handleIncreaseItemQuantity = () => increaseItemQuantity(item);
  const handleDecreaseItemQuantity = () => decreaseItemQuantity(item);

  const DeleteButton = () => (
    <div
      className="absolute top-[13px] right-[16px] text-neutral-500 hover:text-white cursor-pointer"
      onClick={handleRemoveItem}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );

  return (
    <S.Container>
      <DeleteButton />
      <S.ImageContainer>
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill={true}
          sizes="10vw"
        />
      </S.ImageContainer>
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
