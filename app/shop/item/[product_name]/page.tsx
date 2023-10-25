import {
  PRODUCTS,
  getProductById,
  getProductByName,
  getProductId,
} from "@/lib/config";
import { notFound } from "next/navigation";
import { Product, Variation } from "@/lib/models";
import AddToCartButton from "@/lib/components/AddToCartButton";
import Title from "@/lib/components/Title";
import Cart from "@/lib/components/Cart/Cart";
import Image from "next/image";
import ReturnToShopButton from "@/lib/components/ReturnToShopButton";

export function generateStaticParams() {
  return PRODUCTS.map((name) => ({
    params: {
      product_name: name,
    },
  }));
}

function VariationsList({ variations }: { variations: Variation[] }) {
  return (
    <>
      {variations.map((variation: Variation) => {
        const product = getProductById(getProductId(variation.id));
        return (
          <div key={variation.id} className="flex">
            <AddToCartButton product={product} variation={variation} />
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
      <Title text={product.name} />
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
        <div className="flex flex-col place-items-center pt-8 lg:pt-18 lg:place-items-start">
          <VariationsList variations={variationsList} />
        </div>
        <div className="flex justify-center pt-6">
          <ReturnToShopButton />
        </div>
      </div>
      <Cart />
    </div>
  );
}
