import { PRODUCTS, getProductByName } from "@/lib/client-config";
import Cart from "@/lib/components/Cart";
import ProductCard from "@/lib/components/ProductCard";
import Title from "@/lib/components/Title";
import { Product } from "@/lib/models";

interface ProductProps {
  products: Product[];
}

function Products({ products }: ProductProps) {
  return (
    <>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </>
  );
}

export default function Shop() {
  const productsList = PRODUCTS.map((name) => getProductByName(name));
  const lgGridCols = productsList.length > 2 ? 3 : productsList.length;
  return (
    <div className="h-fit min-h-screen">
      <Title text="Welcome to the shop!" />
      <div
        className={`grid justify-items-center grid-cols-1 lg:grid-cols-${lgGridCols}`}
      >
        <Products products={productsList} />
      </div>
      <Cart />
    </div>
  );
}
