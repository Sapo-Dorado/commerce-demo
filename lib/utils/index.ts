export * from "./themes";
export * from "./images";

export function formatPrice(price: number) {
  return "$" + (price / 100).toFixed(2);
}

export function productUrl(name: string) {
  return `/shop/item/${name}`;
}

export function shopUrl() {
  return "/shop";
}
