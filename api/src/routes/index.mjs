import express from "express";
import userRouter from "./test.route.mjs";

const router = express.Router();

router.use(userRouter);

export default router;
