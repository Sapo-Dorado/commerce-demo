import { getInventoryCounts } from "@/lib/square";
import { cache } from "react";

export const revalidate = 3600;

const fetchInventoryCount = cache(async (variationId: string) => {
  return (await getInventoryCounts([variationId])).data.counts[0];
});

export default fetchInventoryCount;
