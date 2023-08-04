import { Get, Route, Tags,  Post, Body, } from "tsoa";
import { IScorePayload } from "../../interfaces/score.interface";
import { getAll, create } from "../../services/score.service";

@Route("scores")
@Tags("Score")
export default class ScoreController {
    @Get("/")
    async getAlls() {
        return await getAll();
    }

    @Post()
    async createUser(@Body() body: IScorePayload) {
        return await create(body);
    }
}