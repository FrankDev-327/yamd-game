import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { getAll, getById, create } from "../../services/user.service";

@Route("users")
@Tags("User")
export default class UserController {
    @Get("/")
    async getAllUsers() {
        return await getAll();
    }

    @Get("/:id")
    async getUserById(@Path() id: number) {
        return await getById(id);
    }

    @Post()
    async createUser(@Body() body) {
        return await create(body);
    }

}