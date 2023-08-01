import { User } from "../../entity/User";
import { comparingPassword } from "../../utils/bcrypt.helper";
import { InitAppSource } from "../../init-db/init.db";
import { getUserById } from "../users/user.repository";
import { IAuthPayload } from "../../interfaces/auth.interface";

export const logIn = async (payload: IAuthPayload) => {
    const authRepository = InitAppSource.getRepositoryEntityInstance(User);
    const user = await authRepository.findOne({
        where:{email: payload.email}
    });

    if (!user) return null;

    const comparePassowrd = await comparingPassword(payload.password, user.password);
    if(!comparePassowrd) return null;

    return await getUserById(user.id);
}