import * as express from "express";
import UserController from "../controllers/users/user.controller";
import { checkJwt } from "../middleware/jwtMiddleware";

const router = express.Router();

router.get("/", [checkJwt], async (_req, res) => {
    const controller = new UserController();
    const response = await controller.getAllUsers();
    return res.send(response);
  });
  
  router.post("/", [checkJwt], async (req, res) => {
    const controller = new UserController();
    const response = await controller.createUser(req.body);
    return res.send(response);
  });
  
  router.get("/info",[checkJwt],  async (req, res) => {
    const controller = new UserController();
    const response = await controller.getUserById(req.user.id);
    if (!response) res.status(404).send({message: "No user found"});
    return res.send(response);
  });

    
  router.get("/scores",[checkJwt],  async (req, res) => {
    const controller = new UserController();
    const response = await controller.getScores(req.user.id);
    if (!response) res.status(404).send({message: "No scores found"});
    return res.send(response);
  });
  
  export default router;