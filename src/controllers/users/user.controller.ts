import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { Request } from "express";
import { getAll, getById, create, getScores } from "../../services/user.service";

@Route("users")
@Tags("User")
export default class UserController {
    @Post()
    async createUser(@Body() body) {      
        return await create(body);
    }
    
    @Get("/")
    async getAllUsers() {
        return await getAll();
    }

    @Get("/info")
    async getUserById(id: number) {
        return await getById(id);
    }

    @Get("/scores")
    async getScores(id: number) {
        return await getScores(id);
    }
}