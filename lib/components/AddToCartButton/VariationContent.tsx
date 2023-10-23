import { Variation } from "@/lib/models";
import { formatPrice } from "@/lib/utils";
import InventoryCount from "./InventoryCount";

export default function VariationContent({
  variation,
}: {
  variation: Variation;
}) {
  return (
    <div>
      <p className="font-semibold">
        {variation.name} - {formatPrice(variation.price)}{" "}
      </p>
      <InventoryCount variationId={variation.id} />
    </div>
  );
}
