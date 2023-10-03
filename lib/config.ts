const config: Record<string, any> = require("@/configuration/shop_config.json");
const required_config_keys = ["app-id", "location-id"];
const required_product_keys = [
  "name",
  "description",
  "image",
  "product-id",
  "variations",
];
const required_varation_keys = ["name", "price", "variation-id"];

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
  long_description: string;
  image: string;
  thumbnail: string;
  variations: Variation[];

  constructor(
    id: string,
    name: string,
    description: string,
    long_description: string,
    image: string,
    thumbnail: string,
    variations: Variation[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.long_description = long_description;
    this.image = image;
    this.thumbnail = thumbnail;
    this.variations = variations;
  }
}

function createVariation(
  variation_info: Record<string, any>,
  used_variation_names: Set<String>
): Variation {
  for (const key of required_varation_keys) {
    if (variation_info[key] == undefined) {
      throw new Error(`Variation missing field ${key}`);
    }
  }
  const name = variation_info["name"];
  if (used_variation_names.has(name)) {
    throw new Error(
      `Variation name ${name} used multiple times. (Variation names must be unique)`
    );
  }
  used_variation_names.add(name);

  const id: string = variation_info["variation-id"];
  const price: number = variation_info["price"];

  return new Variation(id, name, price);
}

function createProduct(
  product_info: Record<string, any>,
  used_product_names: Set<string>
): Product {
  for (const key of required_product_keys) {
    if (product_info[key] == undefined) {
      throw new Error(`Product missing field ${key}`);
    }
  }

  const name: string = product_info["name"];
  if (used_product_names.has(name)) {
    throw new Error(
      `Product name ${name} used multiple times. (Product names must be unique)`
    );
  }
  used_product_names.add(name);

  const id: string = product_info["id"];
  const description: string = product_info["description"];
  const long_description: string =
    product_info["long-description"] ?? description;
  const image: string = product_info["image"];
  const thumbnail: string = product_info["thumbnail"] ?? image;

  const used_variation_names: Set<string> = new Set();
  const variations = product_info["variations"].map(
    (variation_info: Map<string, any>) =>
      createVariation(variation_info, used_variation_names)
  );

  return new Product(
    id,
    name,
    description,
    long_description,
    image,
    thumbnail,
    variations
  );
}

// Validate config
for (const key of required_config_keys) {
  if (config[key] == undefined) {
    throw new Error(`Config file is missing ${key}`);
  }
}
const used_product_names: Set<string> = new Set();

var access_token: string;
if (process.env.SQUARE_ACCESS_TOKEN !== undefined) {
  access_token = process.env.SQUARE_ACCESS_TOKEN;
} else {
  throw new Error(`SQUARE_ACCESS_TOKEN missing from .env file`);
}
export const SQUARE_ACCESS_TOKEN: string = access_token;
export const SQUARE_APPLICATION_ID: string = config["app-id"];
export const SQUARE_LOCATION_ID: string = config["location-id"];
export const PRODUCTS: Product[] = config["products"].map(
  (product_info: Record<string, any>) =>
    createProduct(product_info, used_product_names)
);

export function getProductByName(product_name: string): Product | undefined {
  for (const product of PRODUCTS) {
    if (product.name == product_name) {
      return product;
    }
  }
}
