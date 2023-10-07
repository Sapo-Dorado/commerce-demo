import { colors, breakpoints } from "./themes";

export function formatPrice(price: number) {
  return "$" + price / 100;
}

export { colors, breakpoints };
