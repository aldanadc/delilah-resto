import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  SERVER_PORT: process.env.SERVER_PORT,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_CONECTOR: process.env.DB_CONNECTOR,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET
}

export default {
  ENV
}