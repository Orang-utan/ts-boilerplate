import { config as configDotenv } from 'dotenv';
import { resolve } from 'path';

switch (process.env.NODE_ENV) {
  case 'development':
    console.log("Environment is 'development'");
    configDotenv({
      path: resolve(__dirname, '../../.env.development'),
    });
    break;
  case 'production':
    console.log("Environment is 'production'");
    break;
  default:
    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`);
}

const ATLAS_URI = process.env.ATLAS_URI || '';
const JWT_SECRET = process.env.JWT_SECRET || '';

// sendgrid configs
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
const SENDGRID_EMAIL = 'hello@email.com';

export { ATLAS_URI, JWT_SECRET, SENDGRID_API_KEY, SENDGRID_EMAIL };
