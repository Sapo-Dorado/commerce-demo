export * from "./client-config";

var accessToken: string;
if (process.env.SQUARE_ACCESS_TOKEN !== undefined) {
  accessToken = process.env.SQUARE_ACCESS_TOKEN;
} else {
  throw new Error(`SQUARE_ACCESS_TOKEN missing from .env file`);
}

export const SQUARE_ACCESS_TOKEN: string = accessToken;
