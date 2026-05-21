import winston from "winston";
import config from "./server.config";

const logger = winston.createLogger({
  level: config.LOG_LEVEL,

  defaultMeta: {
    service: config.SERVICE_NAME,
  },

  format: winston.format.combine(
    winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss"  }),// how the timestamp should be formatted
   //winston.format.json(),// Format the log message as JSON
    winston.format.printf(({ level, timestamp, service,message, }) => {

      return `[${timestamp}] [${level}] [${service}]: ${message}`;
    })
  ),

  transports: [new winston.transports.Console()],
});

export default logger;