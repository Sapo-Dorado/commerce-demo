import { getInventoryCount } from "@/lib/square";
import { cache } from "react";

export const revalidate = 3600;

const fetchInventoryCount = cache(async (variationId: string) => {
  return (await getInventoryCount(variationId)).data.count;
});

export default fetchInventoryCount;
