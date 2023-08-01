import { User } from "../../entity/User";
import { comparingPassword, validateEmailFormat } from "../../utils/bcrypt.helper";
import { InitAppSource } from "../../init-db/init.db";
import { IAuthPayload } from "../../interfaces/auth.interface";
import { generateToken } from "../../jwt-token/encode.payload";

export const logIn = async (payload: IAuthPayload) => {
    const authRepository = InitAppSource.getRepositoryEntityInstance(User);
    const isValidEmailFormat = validateEmailFormat(payload.email);    

    if (!isValidEmailFormat) {
        return { error: 'Invalid email format' };
    }

    const user = await authRepository.findOne({
        where:{email: payload.email}
    });
    
    if (!user) {
        return { error: 'Invalid email or password' };
    }

    try {
        const isPasswordValid = await comparingPassword(payload.password, user.password);
        if (!isPasswordValid) {
            return { error: 'Invalid email or password' };
        }

        const token = await generateToken(user.id);   
        return {
            token:token
        }
        
    } catch (error) {
        return { error: 'An error occurred during login' };
    }
}