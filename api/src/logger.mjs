import winston from "winston";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const { combine, timestamp, errors, colorize, printf, json } = winston.format;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const logsDirectory = path.resolve(currentDirectory, "../logs");

fs.mkdirSync(logsDirectory, { recursive: true });

const consoleFormat = printf(({ timestamp: time, level, message, stack, ...meta }) => {
  const serializedMeta = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";

  return `${time} [${level}] ${stack ?? message}${serializedMeta}`;
});

const transports = [
  new winston.transports.Console({
    format:
      process.env.NODE_ENV === "production"
        ? combine(timestamp(), errors({ stack: true }), json())
        : combine(colorize(), timestamp(), errors({ stack: true }), consoleFormat),
  }),
  new winston.transports.File({
    filename: path.join(logsDirectory, "combined.log"),
    format: combine(timestamp(), errors({ stack: true }), json()),
  }),
  new winston.transports.File({
    filename: path.join(logsDirectory, "error.log"),
    level: "error",
    format: combine(timestamp(), errors({ stack: true }), json()),
  }),
];

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? "info",
  defaultMeta: {
    service: "sandbox-api",
  },
  transports,
});