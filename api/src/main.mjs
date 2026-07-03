import express from "express";
import cors from "cors";
import routes from "./routes/index.mjs";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(routes);

app.use((req, res) => {
  res.status(404).json({
    name: "Not Found",
    message: "Requested route was not found",
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error("[request-error] Unhandled application error:", error);

  res.status(error?.status ?? 500).json({
    name: error?.name ?? "Internal Server Error",
    message: error?.message ?? "An unexpected server error occurred",
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (error) => {
  if (error?.code === "EADDRINUSE") {
    console.error(`[startup-error] Port ${PORT} is already in use.`);
    console.error(
      "[startup-error] Stop the existing process or use a different PORT value.",
    );
    process.exit(1);
  }

  if (error?.code === "EACCES") {
    console.error(`[startup-error] Permission denied for port ${PORT}.`);
    process.exit(1);
  }

  console.error("[startup-error] Unexpected server startup error:", error);
  process.exit(1);
});
