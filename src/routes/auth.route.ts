import * as express from "express";
import AuthController from "../controllers/auth/auth.controller";

const router = express.Router();

router.post("/login", async (req, res) => {
    const controller = new AuthController();
    const response = await controller.logIn(req.body);
    return res.send(response);
});
  
export default router;