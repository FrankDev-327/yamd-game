import { IScorePayload } from "../interfaces/score.interface";
import { getById } from "./user.service";
import { getAllScores, createScore } from "../repository/scores/score.repository";

export const getAllS = async () => {
    return await getAllScores();
}

export const create = async (payload: IScorePayload) => {
    const user = await getById(payload.userId);
    return await createScore(payload, user);
}