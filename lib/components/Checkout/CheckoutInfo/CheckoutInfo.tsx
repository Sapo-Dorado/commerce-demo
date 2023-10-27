"use client";
import { IOrderData, IOrderItem } from "@/lib/models";
import CheckoutItem from "./CheckoutItem";
import CheckoutTotal from "./CheckoutTotal";
import { calculatePrice } from "@/lib/client-config";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import RemoveButton from "../../RemoveButton";
import ErrorDisplay from "../../ErrorDisplay";

interface IProps {
  order: IOrderData;
  setOrder: (order: IOrderData) => void;
}

export default function CheckoutInfo({ order, setOrder }: IProps) {
  const [errors, setErrors] = useState<string[]>([]);

  const items = order.orderItems.map((orderItem) => orderItem.item);
  const price = calculatePrice(items);

  const removeItem = async (item: IOrderItem) => {
    const response = await fetch("/api/update-order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        order: order,
        itemsToRemove: [item],
      }),
    });

    if (response.status == 200) {
      const { data: order } = await response.json();
      setOrder(order);
    } else {
      const { errors } = await response.json();
      setErrors(errors);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {order.orderItems.map((orderItem) => (
        <div key={orderItem.item.variationId}>
          <CheckoutItem item={orderItem.item}>
            {order.orderItems.length > 1 && (
              <RemoveButton callback={() => removeItem(orderItem)} />
            )}
          </CheckoutItem>
          <div className="container w-1/2">
            <ErrorDisplay errors={errors} />
          </div>
        </div>
      ))}
      <CheckoutTotal total={formatPrice(price)} />
    </div>
  );
}
