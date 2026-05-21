import Redis from "ioredis";
import logger from "./logger.config";
import config from "./server.config";

class RedisClient {
  private static instance: Redis;
  private static isConnected = false;

  private constructor() {
    //prevent direct instantiation
  }

  public static getInstance(): Redis {
    if (!RedisClient.instance) {
      RedisClient.instance = new Redis(config.REDIS_URL, {
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        maxRetriesPerRequest: 3,
      });

      RedisClient.setupEventListeners();
    }

    return RedisClient.instance;
  }

  private static setupEventListeners(): void {
    RedisClient.instance.on("connect", () => {
      logger.info("Redis connected");
      RedisClient.isConnected = true;
    });

    RedisClient.instance.on("error", (error:any) => {
      logger.error(`Redis error: ${error.message}`);
      RedisClient.isConnected = false;
    });

    RedisClient.instance.on("close", () => {
      logger.warn("Redis connection closed");
      RedisClient.isConnected = false;
    });

    RedisClient.instance.on("reconnecting", () => {
      logger.info("Redis reconnecting...");
    });
      RedisClient.instance.on("ready", () => {
      logger.info("Redis Clinet is ready");
    });
  }
}
const redis = RedisClient.getInstance();
export default redis;