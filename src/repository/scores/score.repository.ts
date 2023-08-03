import { Scores } from "../../entity/Scores";
import { IScorePayload } from "../../interfaces/score.interface";
import { InitAppSource } from "../../init-db/init.db";

export const getAllScores = async () => {
    const scoreRepository = InitAppSource.getRepositoryEntityInstance(Scores);
    return await scoreRepository.find();
}

export const createScore = async (payload: IScorePayload, user) => {
    const scoreRepository = InitAppSource.getRepositoryEntityInstance(Scores);
    const scoreCreated = scoreRepository.create(payload);

    scoreCreated.user = user;
    const scoreSaved = await scoreRepository.save(scoreCreated);
    return scoreSaved;
}