import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { getAllUsers, getUserById, createUser } from "../../repository/users/user.repository";

@Route("users")
@Tags("User")
export default class UserController {
    @Get("/")
    async getAllUsers() {
        return await getAllUsers();
    }

    @Get("/:id")
    async getUserById(@Path() id: number) {
        return await getUserById(id);
    }

    @Post()
    async createUser(@Body() body) {
        return await createUser(body);
    }

}