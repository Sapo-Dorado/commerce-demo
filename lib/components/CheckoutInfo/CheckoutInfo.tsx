import { OrderData } from "@/lib/models";
import CheckoutItem from "./CheckoutItem";
import CheckoutTotal from "./CheckoutTotal";
import { calculatePrice } from "@/lib/client-config";
import { formatPrice } from "@/lib/utils";

interface IProps {
  order: OrderData;
}

export default function CheckoutInfo({ order }: IProps) {
  const items = order.orderItems.map((orderItem) => orderItem.item);
  const price = calculatePrice(items);
  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <CheckoutItem item={item} key={item.variationId}/>
      ))}
      <CheckoutTotal total={formatPrice(price)} />
    </div>
  );
}
