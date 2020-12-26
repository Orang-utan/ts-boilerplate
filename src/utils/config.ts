import { config as configDotenv } from 'dotenv';
import { resolve } from 'path';

switch (process.env.NODE_ENV) {
  case 'development':
    console.log("Environment is 'development'");
    configDotenv({
      path: resolve(__dirname, '../../config/.env.development'),
    });
    break;
  case 'test':
    console.log("Environment is 'test'");
    configDotenv({
      path: resolve(__dirname, '../../config/.env.test'),
    });
    break;
  case 'production':
    console.log("Environment is 'production'");
    break;
  default:
    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`);
}

// project config
const { NODE_ENV } = process.env;
const ATLAS_URI =
  process.env.ATLAS_URI || 'mongodb://localhost:27017/myproject';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:30000';

// auth config
const JWT_SECRET = process.env.JWT_SECRET || 'my-placeholder-string';

// sendgrid configs
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || 'my-placeholder-key';
const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL || 'example@email.com';

export {
  ATLAS_URI,
  JWT_SECRET,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL,
  NODE_ENV,
  CLIENT_URL,
};
