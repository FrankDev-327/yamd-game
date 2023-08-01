import { IAuthPayload } from "../interfaces/auth.interface";
import { logIn } from "../repository/auth/auth.repository";

export const signIn = async (payload: IAuthPayload) => {
    return await logIn(payload);
} 