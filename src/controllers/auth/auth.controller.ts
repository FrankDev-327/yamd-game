import { Route, Tags,  Post, Body, Path } from "tsoa";
import { IAuthPayload } from "../../interfaces/auth.interface";
import { logIn } from "../../repository/auth/auth.repository";

@Route("auth")
@Tags("Login")
export default class AuthController {
    @Post()
    async logIn(@Body() body: IAuthPayload) {
        return await logIn(body);
    }
}