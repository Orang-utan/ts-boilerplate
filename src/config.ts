import { config as configDotenv } from "dotenv";
import { resolve } from "path";

switch (process.env.NODE_ENV) {
  case "development":
    console.log("Environment is 'development'");
    configDotenv({
      path: resolve(__dirname, "../dev.env"),
    });
    break;
  case "test":
    configDotenv({
      path: resolve(__dirname, "../test.env"),
    });
    break;
  // Add 'staging' and 'production' cases here as well!
  default:
    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`);
}
