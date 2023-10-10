import InventoryCount from "@/lib/components/InventoryCount";
import { PRODUCTS, getProductByName } from "@/lib/config";
import { notFound } from "next/navigation";
import { Product, Variation } from "@/lib/models";
import AddToCartButton from "@/lib/components/AddToCartButton";
import Cart from "@/lib/components/Cart/Cart";
import Image from "next/image";

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
      {variations.map((variation: Variation) => (
        <p key={variation.name}>
          {variation.name}: {variation.price}
        </p>
      ))}
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
      <div className="h-1/5" />
      <div
        className="container mx-auto aspect-square w-1/4"
        style={{ position: "relative" }}
      >
        <Image
          src={product.image}
          alt={"Picture of " + product.name}
          fill={true}
        />
      </div>
      <div className="containder mx-auto w-2/3">
        <p>Name: {product.name}</p>
        <p>{product.longDescription}</p>
        <VariationsList variations={variationsList} />
        <InventoryCount variationId={variationsList[0].id} />
        <AddToCartButton product={product} variation={variationsList[0]} />
        <Cart />
      </div>
    </div>
  );
}
