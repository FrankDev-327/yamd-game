import { Route, Tags,  Post, Body, Path } from "tsoa";
import { IAuthPayload } from "../../interfaces/auth.interface";
import { signIn } from "../../services/auth.service";

@Route("auth")
@Tags("Login")
export default class AuthController {
    @Post()
    async logIn(@Body() body: IAuthPayload) {
        return await signIn(body);
    }
}