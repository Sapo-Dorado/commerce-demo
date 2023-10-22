import InventoryCount from "@/lib/components/InventoryCount";
import {
  PRODUCTS,
  getProductById,
  getProductByName,
  getProductId,
} from "@/lib/config";
import { notFound } from "next/navigation";
import { Product, Variation } from "@/lib/models";
import AddToCartButton from "@/lib/components/AddToCartButton";
import Cart from "@/lib/components/Cart/Cart";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return PRODUCTS.map((name) => ({
    params: {
      product_name: name,
    },
  }));
}

function ProductInfo({ variation }: { variation: Variation }) {
  return (
    <div>
      <p className="font-semibold">
        {variation.name} - {formatPrice(variation.price)}{" "}
      </p>
      <InventoryCount variationId={variation.id} />
    </div>
  );
}

function VariationsList({ variations }: { variations: Variation[] }) {
  return (
    <>
      {variations.map((variation: Variation) => {
        const product = getProductById(getProductId(variation.id));
        return (
          <div key={variation.id} className="flex">
            <AddToCartButton
              product={product}
              variation={variation}
              content={<ProductInfo variation={variation} />}
            />
          </div>
        );
      })}
    </>
  );
}

export default async function ProductPage({
  params,
}: {
  params: { product_name: string };
}) {
  const { product_name } = params;
  const product: Product = getProductByName(product_name) ?? notFound();

  const variationsList = Object.keys(product.variations).map(
    (id) => product.variations[id]
  );

  return (
    <div className="h-screen">
      <div className="h-1/6">
        <p className="p-5 text-5xl text-left">{product.name}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col items-center">
          <Image
            src={product.image}
            alt={"Picture of " + product.name}
            height={300}
            width={300}
          />
          <p className="pt-8 pl-14 pr-14"> {product.longDescription} </p>
        </div>
        <div className="flex flex-col place-items-center pt-14 lg:pt-28 lg:place-items-start">
          <VariationsList variations={variationsList} />
        </div>
      </div>
      <Cart />
    </div>
  );
}
