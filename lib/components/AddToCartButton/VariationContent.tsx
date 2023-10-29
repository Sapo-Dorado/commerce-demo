import { Variation } from "@/lib/models";
import { formatPrice } from "@/lib/utils";

interface IProps {
  variation: Variation;
  inventoryCount: number;
}
export default function VariationContent({
  variation,
  inventoryCount,
}: IProps) {
  const RegularContent = () => (
    <div>
      <p className="font-semibold">
        {variation.name} - {formatPrice(variation.price)}{" "}
      </p>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">
        {inventoryCount} remaining, buy now! <br />
      </p>
    </div>
  );

  const SoldOutContent = () => (
    <p className="font-semibold">{variation.name} - Sold Out!</p>
  );

  return <>{inventoryCount > 0 ? <RegularContent /> : <SoldOutContent />}</>;
}
