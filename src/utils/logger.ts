import winston from "winston";
import dotenv from "dotenv";
import configuration  from "../config/config";
dotenv.config(); 
// Define custom colors for different log levels
const customColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "cyan",
};

// Apply custom colors to Winston
winston.addColors(customColors);
// const logger = winston.createLogger({
//   level: "info", // Default logging level
//   format: winston.format.combine(
//     winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//     winston.format.errors({ stack: true }), // Log stack trace for errors
//     winston.format.splat(), // Allows %s, %d, %j for formatting
//     winston.format.colorize(), // Apply colorization
//     winston.format.printf(({ level, message, timestamp }) => {
//       return `${timestamp} [${level}]: ${message}`;
//     })
//   ),
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.printf(({ level, message, timestamp }) => {
//           return `${timestamp} [${level}]: ${message}`;
//         })
//       ),
//       level: process.env.NODE_ENV === "development" ? "debug" : "info",
//     }),
//   ],
//   exitOnError: false,
// });
const logger = winston.createLogger({
    level: configuration.env === "development" ? "debug" : "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp
        winston.format.colorize(), // Enable colorization
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        configuration.env === "development"
            ? new winston.transports.Console()
            : new winston.transports.File({ filename: "app.log" })
    ],
});
export default logger;
