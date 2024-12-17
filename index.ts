import app from "./app";
import { PrismaClient } from "@prisma/client";
import { disconnectRedis } from "./src/utils/connectRedis";
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Initialize Prisma client
const prisma = new PrismaClient();

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT} 🔊`);
});

// Flag to prevent multiple shutdown attempts
let isShuttingDown = false;

const gracefulShutdown = async (signal: string) => {
  console.log(`⚠️ Received signal to terminate: ${signal}`);

  try {
    console.log("🛑 Closing Prisma client...");
    await prisma.$disconnect();
    console.log("✅ Prisma client closed.");
  } catch (err) {
    console.error("❌ Error closing Prisma client:", err);
  }

  try {
    console.log("🛑 Closing Redis client...");
    await disconnectRedis();
    console.log("✅ Redis client closed.");
  } catch (err) {
    console.error("❌ Error during Redis shutdown:", err);
  }

  try {
    console.log("🛑 Closing server...");
    server.close(() => {
      console.log("✅ Server closed successfully.");
      process.exit(0); // Explicitly exit the process
    });
  } catch (err) {
    console.error("❌ Error closing server:", err);
    process.exit(1); // Exit with failure code
  }
};

const handleSignal = async (signal: string) => {
  if (isShuttingDown) {
    // Already shutting down, ignore subsequent signals gracefully
    console.log(
      "⚠️ Shutdown already in progress. Please wait, do not press Ctrl+C again."
    );
    return;
  }
  isShuttingDown = true; // Mark that shutdown has started
  await gracefulShutdown(signal);
};

// Register signal handlers for clean exit
process.on("SIGINT", () => handleSignal("SIGINT"));
process.on("SIGTERM", () => handleSignal("SIGTERM"));
