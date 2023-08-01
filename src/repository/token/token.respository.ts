import { Tokens } from "../../entity/tokens";
import { InitAppSource } from "../../init-db/init.db";
import { ITokenPayload } from "../../interfaces/token.interface";

export const getTokenBytoken = async (token: string) => {
    const tokenRepository = InitAppSource.getRepositoryEntityInstance(Tokens);
    return await tokenRepository.findOne({
        where: {token}
    });
}

export const createToken = async (payload: ITokenPayload) => {
    const tokenRepository = InitAppSource.getRepositoryEntityInstance(Tokens);
    return await tokenRepository.save(payload);
}