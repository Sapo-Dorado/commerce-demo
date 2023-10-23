import { colors, breakpoints } from "./themes";

export function formatPrice(price: number) {
  return "$" + (price / 100).toFixed(2);
}

export function productUrl(name: string) {
  return `/shop/item/${name}`;
}

export { colors, breakpoints };
