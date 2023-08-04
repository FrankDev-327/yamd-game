import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { IUserPayload } from "../../interfaces/user.interface";
import { getAll, getById, create, getScores } from "../../services/user.service";

@Route("players")
@Tags("Players")
export default class UserController {
    @Post()
    async createUser(@Body() body: IUserPayload[]) {      
        return await create(body);
    }
    
    @Get("/")
    async getAllUsers() {
        return await getAll();
    }

    @Get("/:id")
    async getUserById(@Path() id: number) {
        return await getById(id);
    }

    @Get("/scores/:id")
    async getScores(@Path() id: number) {
        return await getScores(id);
    }
}