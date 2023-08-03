import UserController from "./user.controller";
import * as UserService from "../../services/user.service";
import { generateUserData, generateUserPayload, generateUsersData } from "../../test/utils/user.generate";

afterEach(() => {
    jest.resetAllMocks();
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

        test('should return user list', async () => {
            const usersData = generateUsersData();
            const spy = jest.spyOn(UserService, 'getAll').mockResolvedValueOnce(usersData);
            const controller = new UserController();
            const users = await controller.getAllUsers();
            expect(users).toEqual(usersData);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        describe('createUser', () => {
            test('should add user to the database', async () => {
                const payload = generateUserPayload();
                const userData = generateUserData(payload);        
                const spy = jest.spyOn(UserService, 'create').mockResolvedValueOnce(userData);
                const controller = new UserController();
                const user = await controller.createUser(payload);
                expect(user).toEqual(userData);
                expect(spy).toHaveBeenCalledWith(payload);
                expect(spy).toHaveBeenCalledTimes(1);
            });
        });

        describe('getUser', () => {
            test('should return user from the database', async () => {
                const id = 1;
                const userData = generateUserData({id});
                const spy = jest.spyOn(UserService, 'getById').mockResolvedValueOnce(userData);
                const controller = new UserController();
                const user = await controller.getUserById(id);
                expect(user).toEqual(userData)
                expect(user[0]?.id).toBe(id);
                expect(spy).toHaveBeenCalledWith(id)
                expect(spy).toHaveBeenCalledTimes(1)
            });
            
            test('should return null if user not found', async () => {
                const id = 1;
                const spy = jest.spyOn(UserService, 'getById').mockResolvedValueOnce(null);
                const controller = new UserController();
                const user = await controller.getUserById(id);
                expect(user).toBeNull();
                expect(spy).toHaveBeenCalledWith(id);
                expect(spy).toHaveBeenCalledTimes(1);
            });
        });
    });
});
  