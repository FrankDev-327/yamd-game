import * as express from "express";
import UserController from "../controllers/users/user.controller";
import { checkJwt } from "../middleware/jwtMiddleware";

const router = express.Router();

router.get("/", [checkJwt], async (_req, res) => {
    const controller = new UserController();
    const response = await controller.getAllUsers();
    return res.send(response);
  });
  
  router.post("/", async (req, res) => {
    const controller = new UserController();
    const response = await controller.createUser(req.body);
    return res.send(response);
  });
  
  router.get("/:id",[checkJwt],  async (req, res) => {
    const controller = new UserController();
    const response = await controller.getUserById(parseInt(req.params.id));
    if (!response) res.status(404).send({message: "No user found"})
    return res.send(response);
  });
  
  export default router;