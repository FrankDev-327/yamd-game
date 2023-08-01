import { Scores } from "../../entity/Scores";
import { IScorePayload } from "../../interfaces/score.interface";
import { InitAppSource } from "../../init-db/init.db";

export const getAllScores = async () => {
    const scoreRepository = InitAppSource.getRepositoryEntityInstance(Scores);
    return scoreRepository.find();
}


export const createScore = async (payload: IScorePayload) => {
    const scoreRepository = InitAppSource.getRepositoryEntityInstance(Scores);
    const scoreEntity = new Scores(); 
    const scoreCreated = scoreRepository.create({
        ...scoreEntity,
        ...payload
    });
    return scoreRepository.save(scoreCreated);
}