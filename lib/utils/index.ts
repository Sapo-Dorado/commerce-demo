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

export function zeros(numZeros: number) {
  const result = new Array(numZeros);
  for (let i = 0; i < numZeros; ++i) {
    result[i] = 0;
  }
  return result;
}
