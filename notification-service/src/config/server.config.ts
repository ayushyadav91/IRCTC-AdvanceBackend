import dotenv from "dotenv";
import packageJson from "../../package.json";

dotenv.config();

type Config = {
  SERVICE_NAME: string;
  PORT: number;
  NODE_ENV: string;
  LOG_LEVEL: string;


  KAFKA_BROKER?:string,
  KAFKA_CLIENT_ID?:string,
}
const config: Config = {
  SERVICE_NAME: packageJson.name,
  PORT: Number(process.env.PORT) || 4002,
  NODE_ENV: process.env.NODE_ENV || "development",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",


  KAFKA_BROKER:process.env.KAFKA_BROKER,
  KAFKA_CLIENT_ID:process.env.KAFKA_CLIENT_ID,

};

export default config;