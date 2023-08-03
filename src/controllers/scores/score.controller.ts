import { Get, Route, Tags,  Post, Body, Path, } from "tsoa";
import { getAll, create } from "../../services/score.service";

@Route("scores")
@Tags("Score")
export default class ScoreController {
    @Get("/")
    async getAlls() {
        return await getAll();
    }

    @Post()
    async createUser(@Body() body) {
        return await create(body);
    }
}