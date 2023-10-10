import { ICartItem, SquareResult } from "@/lib/models";

export async function createOrder(items: ICartItem[]): Promise<SquareResult> {
  const productAmounts = items.reduce((pre, item) => {
    return {
      ...pre,
      [item.variationId]: item.quantity,
    };
  }, {});

  const result = await fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      productAmounts: productAmounts,
    }),
  });
  return await result.json();
}
