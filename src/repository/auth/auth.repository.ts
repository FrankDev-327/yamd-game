import { User } from "../../entity/User";
import { comparingPassword } from "../../utils/helper";
import { InitAppSource } from "../../init-db/init.db";
import { IAuthPayload } from "../../interfaces/auth.interface";
import { generateToken } from "../../jwt-token/encode.payload";

export const logIn = async (payload: IAuthPayload) => {
    const authRepository = InitAppSource.getRepositoryEntityInstance(User);

    const user = await authRepository.findOne({
        where:{nickName: payload.nickName}
    });
    
    if (!user) {
        return { error: 'Invalid nickname or password' };
    }

    try {
        const isPasswordValid = await comparingPassword(payload.password, user.password);
        if (!isPasswordValid) {
            return { error: 'Invalid nickname or password' };
        }

        const token = await generateToken(user.id);   
        return {
            id: user.id,
            token:token
        }
        
    } catch (error) {
        return { error: 'An error occurred during login' };
    }
}