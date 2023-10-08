import CardPayment from "@/lib/components/CardPayment/CardPayment";
import { getOrder } from "@/lib/square";
import { notFound } from "next/navigation";

export default async function Checkout({
  params,
}: {
  params: { order_id: string };
}) {
  const { data: order } = await getOrder(params.order_id);
  if (!order) {
    notFound();
  }

  return (
    <div className="h-screen">
      <div className="h-1/5" />
      <div className="containder mx-auto w-2/3">
        <CardPayment order={order} />
      </div>
    </div>
  );
}
