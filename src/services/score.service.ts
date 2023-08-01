import { IScorePayload } from "../interfaces/score.interface";
import { getAllScores, createScore } from "../repository/scores/score.repository";

export const getAllS = async () => {
    return await getAllScores();
}

export const create = async (payload: IScorePayload) => {
    return await createScore(payload);
}