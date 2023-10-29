import { PRODUCTS, getProductByName } from "@/lib/client-config";
import Cart from "@/lib/components/Cart";
import ProductCard from "@/lib/components/ProductCard";
import Title from "@/lib/components/Title";

export const revalidate = 3600;

export default function Shop() {
  const products = PRODUCTS.map((name) => getProductByName(name));
  const lgGridCols = products.length > 2 ? 3 : products.length;
  return (
    <div className="h-fit min-h-screen">
      <Title text="Welcome to the shop!" />
      <div
        className={`grid grid-cols-1 lg:grid-cols-${lgGridCols} lg:pt-14`}
      >
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <Cart />
    </div>
  );
}
