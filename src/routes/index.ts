import * as express from "express";
import userRouter from "./user.route";
import scoreRouter from "./score.route";

const router = express.Router();

router.use("/players", userRouter);
router.use("/scores", scoreRouter);

export default router;
