import { User } from "../../entity/User";
import { IUserPayload } from "../../interfaces/user.interface";
import { InitAppSource } from "../../init-db/init.db";


export const getAllUsers = async () => {
    const userRepository = InitAppSource.getRepositoryEntityInstance(User);
    return userRepository.find();
}

export const createUser = async (payload: IUserPayload) => {
    const userRepository = InitAppSource.getRepositoryEntityInstance(User);
    const userEntity = new User();
    return userRepository.save({
        ...userEntity,
        ...payload
    });
}

export const getUserById = async (id: number) => {
    const userRepository = InitAppSource.getRepositoryEntityInstance(User);
    const user = await userRepository.findBy({id: id})
    if (!user) return null
    return user
}