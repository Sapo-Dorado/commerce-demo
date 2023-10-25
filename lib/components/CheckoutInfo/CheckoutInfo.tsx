import { OrderData } from "@/lib/models";
import CheckoutItem from "./CheckoutItem";
import CheckoutTotal from "./CheckoutTotal";
import { calculatePrice } from "@/lib/client-config";
import { formatPrice } from "@/lib/utils";

interface IProps {
  order: OrderData;
}

export default function CheckoutInfo({ order }: IProps) {
  const price = calculatePrice(order.items);
  return (
    <div className="flex flex-col">
      {order.items.map((item) => (
        <CheckoutItem item={item} key={item.variationId}/>
      ))}
      <CheckoutTotal total={formatPrice(price)} />
    </div>
  );
}
