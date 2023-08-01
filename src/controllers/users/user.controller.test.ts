import UserController from "./user.controller";
import * as UserService from "../../services/user.service";
import { generateUserData, generateUserPayload, generateUsersData } from "../../test/utils/user.generate";

afterEach(() => {
    jest.resetAllMocks()
});

describe('UserController', () => {
    describe('get all users', () => {
        test('should return an empty array', async () => {
            const spy = jest.spyOn(UserService, 'getAll').mockResolvedValueOnce([]);
            const controller = new UserController();
            const users = await controller.getAllUsers();
            expect(users).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
})
  