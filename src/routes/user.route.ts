import * as express from "express";
import UserController from "../controllers/users/user.controller";
import { checkJwt } from "../middleware/jwtMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Players
 *     description: Endpoints related to players
 * /players:
 *   get:
 *     summary: Get all players
 *     description: Returns a list of all players
 *     tags: [Players]
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nickName:
 *                     type: string
 *                   playerNumber:
 *                     type: integer
 *                   createdDate:
 *                     type: string
 *                   updatedDated:
 *                     type: string
 */
router.get("/", [checkJwt], async (_req, res) => {
    const controller = new UserController();
    const response = await controller.getAllUsers();
    return res.send(response);
  });
  
 /**
 * @swagger
 * tags:
 *   - name: Players
 *     description: Endpoints related to players
 * /players:
 *   post:
 *     summary: Create a new player
 *     description: Create a new player with the given properties
 *     tags: [Players]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickName:
 *                 type: string
 *               playerNumber:
 *                 type: integer
 *             required:
 *               - nickName
 *               - playerNumber
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request, missing required properties or incorrect data format
 */
  router.post("/", [checkJwt], async (req, res) => {
    const controller = new UserController();
    const response = await controller.createUser(req.body);
    return res.send(response);
  });
  
/**
 * @swagger
 * tags:
 *   - name: Players
 *     description: Endpoints related to players
 * /players/{id}:
 *   get:
 *     summary: Get a player
 *     description: Returns user's info
 *     tags: [Players]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the player
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: data about the players
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nickName:
 *                   type: string
 *                 createdDate:
 *                   type: string
 *                 updatedDated:
 *                   type: string
 *       400:
 *         description: Player not found
 */
  router.get("/:id",[checkJwt],  async (req, res) => {
    const controller = new UserController();
    const response = await controller.getUserById(req.params.id);
    if (!response) res.status(404).send({message: "No user found"});
    return res.send(response);
  });

/**
 * @swagger
 * tags:
 *   - name: Players
 *     description: Endpoints related to players
 * /players/scores/{id}:
 *   get:
 *     summary: Get players scores by ID
 *     description: Get players scores by providing the user ID
 *     tags:
 *       - Players
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the players to retrieve scores for
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: players scores retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                 updatedDated:
 *                   type: string
 *                   format: date-time
 *                 nickName:
 *                   type: string
 *                 scores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       createdDate:
 *                         type: string
 *                         format: date-time
 *                       updatedDated:
 *                         type: string
 *                         format: date-time
 *                       total_score:
 *                         type: integer
 *                       category:
 *                         type: string
 *       404:
 *         description: Scores not found for the specified player ID
 */
  router.get("/scores/:id",[checkJwt],  async (req, res) => {
    const controller = new UserController();
    const response = await controller.getScores(req.params.id);
    if (!response) res.status(404).send({message: "No scores found"});
    return res.send(response);
  });
  
  export default router;