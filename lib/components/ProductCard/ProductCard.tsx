import { Product, Variation } from "@/lib/models";
import { productUrl } from "@/lib/utils";
import Image from "next/image";
import VariationSelection from "./VariationSelection";
import AddToCartButton from "../AddToCartButton";

interface IProps {
  product: Product;
}

export default function ProductCard({ product }: IProps) {
  const variations = Object.keys(product.variations).map(
    (id) => product.variations[id]
  );

  const buttons = variations.reduce(
    (pre, variation) => ({
      ...pre,
      [variation.id]: (
        <AddToCartButton product={product} variation={variation} />
      ),
    }),
    {}
  );

  return (
    <div className="flex flex-col place-items-center">
      <a
        className="p-5 m-4 cursor-pointer rounded border border-black border-opacity-25 hover:border-opacity-100"
        href={productUrl(product.name)}
      >
        <p className="text-xl font-medium text-center pb-4">{product.name}</p>
        <Image
          src={product.image}
          alt={"Picture of " + product.name}
          height={250}
          width={250}
          priority={true}
        />
        <p className="text-sm text-center">{product.description} </p>
      </a>
      <div className="flex flex-col m-4">
        <VariationSelection variations={variations} buttons={buttons} />
      </div>
    </div>
  );
}
