import * as express from "express";
import userRouter from "./user.route";
import scoreRouter from "./score.route";
import authRouter from "./auth.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/scores", scoreRouter);

export default router;
