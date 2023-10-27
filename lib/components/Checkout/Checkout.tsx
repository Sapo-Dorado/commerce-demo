"use client";
import { IOrderData, IOrderState } from "@/lib/models";
import CheckoutInfo from "./CheckoutInfo";
import CardPayment from "./CardPayment";
import { useState } from "react";

interface IProps {
  order: IOrderData;
}
export default function Checkout({ order: originalOrder }: IProps) {
  const [order, setOrder] = useState<IOrderData>(originalOrder);

  return (
    <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 lg:pt-24">
      <CheckoutInfo order={order} setOrder={setOrder} />
      <CardPayment order={order} />
    </div>
  );
}
