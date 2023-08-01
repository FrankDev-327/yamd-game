import ScoreController from "./score.controller";
import * as ScoreService from '../../services/score.service';
import {generateScoreData, generateScoresData, generateScorePayload} from '../../test/utils/score.generate';

afterEach(() => {
    jest.resetAllMocks();
});

describe('ScoreController', () => {
    describe('get all scores', () => {
        test('should return an empty array', async () => {
            const spy = jest.spyOn(ScoreService, 'getAll').mockResolvedValueOnce([]);
            const controller = new ScoreController();
            const scores = await controller.getAlls();
            expect(scores).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return score list', async () => {
            const scoreData = generateScoresData();
            const spy = jest.spyOn(ScoreService, 'getAll').mockResolvedValueOnce(scoreData);
            const controller = new ScoreController();
            const scores = await controller.getAlls();
            expect(scores).toEqual(scoreData);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        describe('createScore', () => {
            test('should add score to the database', async () => {
                const payload = generateScorePayload();
                const scoreData = generateScoreData(payload);
                const spy = jest.spyOn(ScoreService, 'create').mockResolvedValueOnce(scoreData);
                const controller = new ScoreController();
                const scores = await controller.createUser(payload);
                expect(scores).toMatchObject(payload);
                expect(scores).toEqual(scoreData);
                expect(spy).toHaveBeenCalledWith(payload);
                expect(spy).toHaveBeenCalledTimes(1);
            });
        });
    });
});