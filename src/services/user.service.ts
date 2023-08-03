import { IUserPayload } from "../interfaces/user.interface";
import { getAllUsers, createUser, getUserById, getUserScores } from "../repository/users/user.repository";

export const getAll = async () => {
    return await getAllUsers();
}

export const create = async (payload: IUserPayload[]) => {
    return await createUser(payload);
}

export const getById = async (id: number) => {
    return await getUserById(id);
}

export const getScores = async (id: number) => {
    return await getUserScores(id);
}