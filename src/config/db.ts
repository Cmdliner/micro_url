import redis from "redis";

export const redisClient = redis.createClient({
    url: process.env.REDIS_URL as string
})
const connectRedis = async () => await redisClient.connect();

export default connectRedis;