import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  SERVER_PORT: process.env.SERVER_PORT,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_CONECTOR: process.env.DB_CONECTOR,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
}