import { ITokenPayload } from "../interfaces/token.interface";
import { createToken, getTokenBytoken } from "../repository/token/token.respository";

export const create = async (payload: ITokenPayload) => {
    return await createToken(payload);
}

export const getByToken = async (token: string) => {
    return await getTokenBytoken(token);
}