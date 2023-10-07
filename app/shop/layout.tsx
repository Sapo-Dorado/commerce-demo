import { CartProvider } from "@/lib/contexts/cart-context";
import Cart from "@/lib/components/Cart";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartProvider>
        {children}
        <Cart />
      </CartProvider>
    </>
  );
}
