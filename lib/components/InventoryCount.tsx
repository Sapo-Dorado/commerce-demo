import { cache } from "react";
import { getInventoryCount } from "../square";

export const revalidate = 3600;

const fetchInventoryCount = cache(async (variationId: string) => {
  return (await getInventoryCount(variationId)).data.count;
});

export default async function InventoryCount({
  variationId,
}: {
  variationId: string;
}) {
  const count = await fetchInventoryCount(variationId);
  return (
    <div className="container mx-auto content-center">
      <p className="m-0 max-w-[30ch] text-sm opacity-50">
        {count} remaining, buy now! <br />
      </p>
    </div>
  );
}
