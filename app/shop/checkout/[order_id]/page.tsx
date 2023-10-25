import CardPayment from "@/lib/components/CardPayment/CardPayment";
import CheckoutInfo from "@/lib/components/CheckoutInfo";
import Title from "@/lib/components/Title";
import { OrderState } from "@/lib/models";
import { getOrder } from "@/lib/square";
import { shopUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Checkout({
  params,
}: {
  params: { order_id: string };
}) {
  const { data: order } = await getOrder(params.order_id);

  if (!order || order.state === OrderState.Unknown) {
    redirect(shopUrl());
  }

  return (
    <div className="h-screen">
      <Title text="Checkout" />
      <div className="grid place-items-center grid-cols-1 lg:grid-cols-2">
        <CheckoutInfo order={order} />
        <CardPayment order={order} />
      </div>
    </div>
  );
}
