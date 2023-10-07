import { Variation, Product } from "./models";
const config: Record<string, any> = require("@/configuration/shop_config.json");
const requiredConfigKeys = ["app-id", "location-id"];
const requiredProductKeys = [
  "name",
  "description",
  "image",
  "product-id",
  "variations",
];
const requiredVariationKeys = ["name", "price", "variation-id"];

function createVariation(
  variationInfo: Record<string, any>,
  usedVariationNames: Set<String>
): Variation {
  for (const key of requiredVariationKeys) {
    if (variationInfo[key] === undefined) {
      throw new Error(`Variation missing field ${key}`);
    }
  }
  const name = variationInfo["name"];
  if (usedVariationNames.has(name)) {
    throw new Error(
      `Variation name ${name} used multiple times. (Variation names must be unique)`
    );
  }
  usedVariationNames.add(name);

  return {
    id: variationInfo["variation-id"],
    name,
    price: variationInfo["price"],
  };
}

function createProduct(
  productInfo: Record<string, any>,
  usedProductNames: Set<string>
): Product {
  for (const key of requiredProductKeys) {
    if (productInfo[key] === undefined) {
      throw new Error(`Product missing field ${key}`);
    }
  }

  const name: string = productInfo["name"];
  if (usedProductNames.has(name)) {
    throw new Error(
      `Product name ${name} used multiple times. (Product names must be unique)`
    );
  }
  usedProductNames.add(name);

  const usedVariationNames: Set<string> = new Set();
  const variations = productInfo["variations"].map(
    (variation_info: Map<string, any>) =>
      createVariation(variation_info, usedVariationNames)
  );

  return {
    id: productInfo["product-id"],
    name,
    description: productInfo["description"],
    longDescription:
      productInfo["long-description"] ?? productInfo["description"],
    image: productInfo["image"],
    thumbnail: productInfo["thumbnail"] ?? productInfo["image"],
    variations,
  };
}

function getProductByName(product_name: string): Product | undefined {
  for (const product of PRODUCTS) {
    if (product.name === product_name) {
      return product;
    }
  }
}

// Validate config
for (const key of requiredConfigKeys) {
  if (config[key] === undefined) {
    throw new Error(`Config file is missing ${key}`);
  }
}
const usedProductNames: Set<string> = new Set();

var accessToken: string;
if (process.env.SQUARE_ACCESS_TOKEN !== undefined) {
  accessToken = process.env.SQUARE_ACCESS_TOKEN;
} else {
  throw new Error(`SQUARE_ACCESS_TOKEN missing from .env file`);
}

export const SQUARE_ACCESS_TOKEN: string = accessToken;
export const SQUARE_APPLICATION_ID: string = config["app-id"];
export const SQUARE_LOCATION_ID: string = config["location-id"];
export const CURRENCY: string = config["currency"];
export const PRODUCTS: Product[] = config["products"].map(
  (productInfo: Record<string, any>) =>
    createProduct(productInfo, usedProductNames)
);

export { getProductByName };
