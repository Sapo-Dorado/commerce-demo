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

export class Variation {
  id: string;
  name: string;
  price: number;

  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

export class Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  thumbnail: string;
  variations: Variation[];

  constructor(
    id: string,
    name: string,
    description: string,
    longDescription: string,
    image: string,
    thumbnail: string,
    variations: Variation[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.longDescription = longDescription;
    this.image = image;
    this.thumbnail = thumbnail;
    this.variations = variations;
  }
}

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

  const id = variationInfo["variation-id"];
  const price = variationInfo["price"];

  return new Variation(id, name, price);
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

  const id = productInfo["product-id"];
  const description = productInfo["description"];
  const longDescription = productInfo["long-description"] ?? description;
  const image = productInfo["image"];
  const thumbnail = productInfo["thumbnail"] ?? image;

  const usedVariationNames: Set<string> = new Set();
  const variations = productInfo["variations"].map(
    (variation_info: Map<string, any>) =>
      createVariation(variation_info, usedVariationNames)
  );

  return new Product(
    id,
    name,
    description,
    longDescription,
    image,
    thumbnail,
    variations
  );
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

export function getProductByName(product_name: string): Product | undefined {
  for (const product of PRODUCTS) {
    if (product.name === product_name) {
      return product;
    }
  }
}
