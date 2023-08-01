import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { getAllScores, createScore } from "../../repository/scores/score.repository";

@Route("scores")
@Tags("Score")
export default class ScoreController {
    @Get("/")
    async getAllScores() {
        return await getAllScores();
    }

    @Post()
    async createUser(@Body() body) {
        return await createScore(body);
    }
}