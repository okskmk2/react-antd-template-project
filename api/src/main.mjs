import express from "express";
import crypto from "node:crypto";
import cors from "cors";
import routes from "./routes/index.mjs";
import { logger } from "./logger.mjs";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use((req, res, next) => {
  const startedAt = Date.now();
  const requestId = crypto.randomUUID();

  req.requestId = requestId;
  req.logger = logger.child({ requestId });
  res.setHeader("X-Request-Id", requestId);

  res.on("finish", () => {
    req.logger.http("Incoming request handled", {
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
    });
  });

  next();
});

app.use(routes);

app.use((req, res) => {
  req.logger.warn("Route not found", {
    method: req.method,
    path: req.originalUrl,
  });

  res.status(404).json({
    name: "Not Found",
    message: "Requested route was not found",
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  req.logger.error("Unhandled application error", {
    method: req.method,
    path: req.originalUrl,
    statusCode: error?.status ?? 500,
    error,
  });

  res.status(error?.status ?? 500).json({
    name: error?.name ?? "Internal Server Error",
    message: error?.message ?? "An unexpected server error occurred",
  });
});

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

server.on("error", (error) => {
  if (error?.code === "EADDRINUSE") {
    logger.error(`Port ${PORT} is already in use.`);
    logger.error("Stop the existing process or use a different PORT value.");
    process.exit(1);
  }

  if (error?.code === "EACCES") {
    logger.error(`Permission denied for port ${PORT}.`);
    process.exit(1);
  }

  logger.error("Unexpected server startup error", { error });
  process.exit(1);
});
