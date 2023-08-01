import { Get, Route, Tags,  Post, Body, Path, } from "tsoa";
import { Request } from "express";
import { getAllS, create } from "../../services/score.service";

@Route("scores")
@Tags("Score")
export default class ScoreController {
    @Get("/")
    async getAllScores() {
        return await getAllS();
    }

    @Post()
    async createUser(@Body() body) {
        return await create(body);
    }
}