// Don't export any secrets in this config
import { Variation, Product } from "./models";

const config: Record<string, any> = require("@/configuration/shop_config.json");
const requiredConfigKeys = [
  "app-id",
  "location-id",
  "currency",
  "country-code",
  "products",
];
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
  const variations = productInfo["variations"].reduce(
    (pre: Record<string, Variation>, variation_info: Record<string, any>) => ({
      ...pre,
      [variation_info["variation-id"]]: createVariation(
        variation_info,
        usedVariationNames
      ),
    }),
    {}
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

// Validate config
for (const key of requiredConfigKeys) {
  if (config[key] === undefined) {
    throw new Error(`Config file is missing ${key}`);
  }
}
const usedProductNames: Set<string> = new Set();

export const SQUARE_APPLICATION_ID: string = config["app-id"];
export const SQUARE_LOCATION_ID: string = config["location-id"];
export const CURRENCY: string = config["currency"];
export const COUNTRY_CODE: string = config["country-code"];

const ID_TO_PRODUCT: Record<string, Product> = config["products"].reduce(
  (pre: Record<string, Product>, productInfo: Record<string, any>) => ({
    ...pre,
    [productInfo["product-id"]]: createProduct(productInfo, usedProductNames),
  }),
  {}
);
const PRODUCT_NAME_TO_ID: Record<string, string> = Object.keys(
  ID_TO_PRODUCT
).reduce(
  (pre: Record<string, string>, id: string) => ({
    ...pre,
    [ID_TO_PRODUCT[id].name]: id,
  }),
  {}
);

export const PRODUCTS = Object.keys(ID_TO_PRODUCT).map(
  (id: string) => ID_TO_PRODUCT[id].name
);

export function getProductById(id: string) {
  return ID_TO_PRODUCT[id];
}
export function getProductByName(name: string) {
  return ID_TO_PRODUCT[PRODUCT_NAME_TO_ID[name]];
}

export function getVariation(
  productId: string,
  variationId: string
): Variation {
  return ID_TO_PRODUCT[productId].variations[variationId];
}
