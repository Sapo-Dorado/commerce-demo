import Checkout from "@/lib/components/Checkout";
import Title from "@/lib/components/Title";
import { IOrderState } from "@/lib/models";
import { getOrder } from "@/lib/square";
import { shopUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function CheckoutPage({
  params,
}: {
  params: { order_id: string };
}) {
  const { data: order } = await getOrder(params.order_id);

  if (!order || order.state === IOrderState.Unknown) {
    redirect(shopUrl());
  }

  return (
    <div className="h-screen">
      <Title text="Checkout" />
      <Checkout order={order} />
    </div>
  );
}
