import { CartProvider } from "@/lib/contexts/cart-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartProvider>{children}</CartProvider>
    </>
  );
}
