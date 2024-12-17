import winston from "winston";
import config from "../../config";

const { combine, timestamp, errors, splat, json, colorize, printf } =
  winston.format;

// Custom log format for development environment
const devFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Configure transports based on environment
const transports = [];

// Console transport
if (process.env.NODE_ENV !== "production") {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize(), // Adds color to log levels in console
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        devFormat // Development-friendly log format
      ),
    })
  );
} else {
  // Production-ready format
  transports.push(
    new winston.transports.Console({
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        splat(),
        json() // JSON format for easier logging aggregation
      ),
    })
  );
}

// File transport (optional: log errors to a file in production)
if (process.env.NODE_ENV === "production") {
  transports.push(
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        json()
      ),
    })
  );
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level || "info", // Default log level
  levels: winston.config.npm.levels,
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    splat()
  ),
  transports,
});

export default LoggerInstance;
