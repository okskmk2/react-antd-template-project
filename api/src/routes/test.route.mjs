import express from "express";

const router = express.Router();

router.get("/test/401", (req, res) => {
  res.status(401).json({
    name: "Unauthorized",
    message: "Authentication is required",
  });
});

router.get("/test/403", (req, res) => {
  res.status(403).json({
    name: "Forbidden",
    message: "You do not have permission to access this resource",
  });
});

router.get("/test/500", (req, res) => {
  res.status(500).json({
    name: "Internal Server Error",
    message: "An unexpected server error occurred",
  });
});

router.get("/test/502", (req, res) => {
  res.status(502).json({
    name: "Bad Gateway",
    message: "Invalid response from upstream server",
  });
});

router.get("/test/503", (req, res) => {
  res.status(503).json({
    name: "Service Unavailable",
    message: "Service is temporarily unavailable",
  });
});

router.get("/test/unexpected-error", (req, res, next) => {
  const dividend = 10;
  const divisor = 0;

  if (divisor === 0) {
    throw new RangeError("Division by zero");
  }

  res.json({
    result: dividend / divisor,
  });
});

export default router;
