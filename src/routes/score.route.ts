import * as express from "express";
import { checkJwt } from "../middleware/jwtMiddleware";
import ScoreController from "../controllers/scores/score.controller";

const router = express.Router();

router.get("/", [checkJwt], async (_req, res) => {
    const controller = new ScoreController();
    const response = await controller.getAllScores();
    return res.send(response);
  });
  
  router.post("/", [checkJwt], async (req, res) => {
    const controller = new ScoreController();
    const response = await controller.createUser(req.body);
    return res.send(response);
  });
  
  export default router;