import dotenv from "dotenv";
import packageJson from "../../package.json";

dotenv.config();

type Config = {
  SERVICE_NAME: string;
  PORT: number;
  NODE_ENV: string;
  LOG_LEVEL: string;
  REDIS_URL: string;
  ALLOWED_ORIGINS: string;
  OTP_TTL:number;
  OTP_RATE_MAX_PER_HOUR:number;
  OTP_MAX_VERFIY_ATTEMPTS:number;
  DATABASE_URL?:string;
  //mail specifc ports for nodemailer but we also use Mail Service for the SendGrid v3 Web API
  EMAIL_HOST?:string,
  EMAIL_PORT:number,
  EMAIL_SECURE:boolean,
  EMAIL_USER?:string,
  EMAIL_PASS?:string,
  EMAIL_FROM?:string,

  JWT_ACCESS_SECRET:any,
  JWT_ACCESS_EXPIRES_IN:any,
  ACCESS_TOKEN_EXPIRES_IN_SECONDS:number,


  JWT_REFRESH_SECRET:any,
  JWT_REFRESH_EXPIRES_IN:any,
  REFRESH_TOKEN_EXPIRES_IN_SECONDS:number,

  REDIS_USER_TTL:number,
  GOOGLE_CLIENT_ID?:string,
  GOOGLE_CLIENT_SECRET?:string,
  KAFKA_BROKER?:string,
  KAFKA_CLIENT_ID?:string,

}
const config: Config = {
  DATABASE_URL:process.env.DATABASE_URL,
  SERVICE_NAME: packageJson.name,
  PORT: Number(process.env.PORT) || 4001,
  NODE_ENV: process.env.NODE_ENV || "development",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  ALLOWED_ORIGINS:process.env.ALLOWED_ORIGINS || "http://localhost:4000",
  OTP_TTL:Number(process.env.OTP_TTL)||5,
  OTP_RATE_MAX_PER_HOUR:Number(process.env.OTP_RATE_MAX_PER_HOUR)||5,
  OTP_MAX_VERFIY_ATTEMPTS:Number(process.env.OTP_MAX_VERFIY_ATTEMPTS)||5,
  KAFKA_BROKER:process.env.KAFKA_BROKER,
  KAFKA_CLIENT_ID:process.env.KAFKA_CLIENT_ID,



  //MAIL CONFIGRUTION
  EMAIL_HOST:process.env.EMAIL_HOST,
  EMAIL_PORT: Number(process.env.EMAIL_PORT),
  EMAIL_SECURE: process.env.EMAIL_SECURE === "true",
  EMAIL_USER: process.env.EMAIL_USER ,
  EMAIL_PASS: process.env.EMAIL_PASS  ,
  EMAIL_FROM: process.env.EMAIL_FROM ,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  ACCESS_TOKEN_EXPIRES_IN_SECONDS: Number(process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS),
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN_SECONDS: Number(process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS),

  REDIS_USER_TTL:Number(process.env.REDIS_USER_TTL)||86400,
  GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,




};

export default config;