import {
  getProductById,
  getVariation,
  calculatePrice,
} from "@/lib/client-config";
import { ICartItem } from "@/lib/models";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface IProps {
  item: ICartItem;
}

export default function CheckoutItem({ item }: IProps) {
  const product = getProductById(item.productId);
  const variation = getVariation(item.productId, item.variationId);
  const price = calculatePrice([item]);
  return (
    <div className="flex px-5 py-2 m-2 rounded border border-black border-opacity-25">
      <div className="h-16 w-16 relative">
        <Image
          src={product.thumbnail}
          alt={"Picture of " + product.name}
          fill={true}
        />
      </div>
      <div className="flex flex-col w-28 mx-8">
        <p className="font-semibold text-base">{product.name}</p>
        <p className="text-sm">{variation.name}</p>
        <p className="text-xs opacity-50">
          {item.quantity} x {formatPrice(variation.price)}
        </p>
      </div>
      <div className="flex place-items-center">
        <p className="text-xl font-semibold">{formatPrice(price)}</p>
      </div>
    </div>
  );
}
