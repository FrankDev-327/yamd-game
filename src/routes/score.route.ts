import * as express from "express";
import { checkJwt } from "../middleware/jwtMiddleware";
import ScoreController from "../controllers/scores/score.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Scores
 *     description: Endpoints related to scores
 * /scores/:
 *   get:
 *     summary: Get all scores
 *     description: Returns a list of all scores
 *     tags: [Scores]
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Success. Returns a list of scores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                   updatedDated:
 *                     type: string
 *                     format: date-time
 *                   total_score:
 *                     type: integer
 *                   category:
 *                     type: string
 *   responses:
 *     200:
 *       description: User created successfully
 */
router.get("/", [checkJwt], async (_req, res) => {
    const controller = new ScoreController();
    const response = await controller.getAlls();
    return res.send(response);
  });
  
 /**
 * @swagger
 * tags:
 *   - name: Scores
 *     description: Endpoints related to scores
 * /scores/:
 *   post:
 *     summary: Create a new score
 *     description: Create a new score with the given properties
 *     tags: [Scores]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total_score:
 *                 type: integer
 *               category:
 *                 type: string
 *               userId:
 *                 type: integer
 *             required:
 *               - total_score
 *               - category
 *               - userId
 *     responses:
 *       200:
 *         description: Score created successfully
 *       400:
 *         description: Bad request, missing required properties or incorrect data format
 */
  router.post("/", [checkJwt], async (req, res) => {
    const controller = new ScoreController();
    const response = await controller.createUser(req.body);
    return res.send(response);
  });
  
  export default router;