import config from "config";
import { createClient } from "redis";

const redisUrl = config.get<string>("redisurl");
const redisClient = createClient({
  url: redisUrl,
});

let isShuttingDown = false; // Flag to indicate shutdown process
let isConnecting = false; // Flag to prevent multiple connection attempts

const connectRedis = async () => {
  if (isShuttingDown) {
    console.log("❌ Redis connection aborted due to application shutdown.");
    return;
  }

  if (isConnecting) {
    console.log(
      "⚠️ Redis connection already in progress. Skipping new attempt."
    );
    return;
  }

  try {
    isConnecting = true; // Mark as connecting
    await redisClient.connect();
    isConnecting = false; // Reset connecting flag on success
    console.log("✅ Redis client connected successfully.");
  } catch (error) {
    isConnecting = false; // Reset connecting flag on failure
    console.error(
      "❌ Redis connection failed. Retrying in 5 seconds...",
      error
    );

    if (!isShuttingDown) {
      setTimeout(connectRedis, 5000); // Retry connection after 5 seconds
    }
  }
};

const disconnectRedis = async () => {
  try {
    isShuttingDown = true; // Prevent further retries
    console.log("🛑 Closing Redis client...");
    await redisClient.quit();
    console.log("✅ Redis client closed.");
  } catch (error) {
    console.error("❌ Error closing Redis client:", error);
  }
};

connectRedis();

export { connectRedis, disconnectRedis };
export default redisClient;
