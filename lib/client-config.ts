// Don't export any secrets in this config
const config: Record<string, any> = require("@/configuration/shop_config.json");

export const SQUARE_APPLICATION_ID: string = config["app-id"];
export const SQUARE_LOCATION_ID: string = config["location-id"];
export const CURRENCY: string = config["currency"];
export const COUNTRY_CODE: string = config["country-code"];
