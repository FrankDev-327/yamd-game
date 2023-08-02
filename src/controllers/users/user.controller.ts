import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { getAll, getById, create } from "../../services/user.service";

@Route("users")
@Tags("User")
export default class UserController {
    @Post()
    async createUser(@Body() body) {
        console.log(body);
        
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
}