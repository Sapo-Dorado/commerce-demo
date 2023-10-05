import { CardPayment } from "@/lib/components/card_payment";
import { Product, Variation, PRODUCTS, getProductByName } from "@/lib/config";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    params: {
      product_name: product.name,
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

  const productAmounts: Record<string, number> = {};
  productAmounts[product.variations[0].id] = 1;

  return (
    <div className="h-screen">
      <div className="h-1/5" />
      <div className="container mx-auto aspect-square w-1/4">
        <img
          src={product.image}
          alt={"Picture of " + product.name}
          className="object-cover"
        />
      </div>
      <div className="containder mx-auto w-2/3">
        <p>Name: {product.name}</p>
        <p>{product.longDescription}</p>
        <VariationsList variations={product.variations} />
        <CardPayment productAmounts={productAmounts} />
      </div>
    </div>
  );
}
