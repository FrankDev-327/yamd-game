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
    const userCreated = userRepository.create({
        ...userEntity,
        ...payload
    });

    const userInserted = await userRepository.save(userCreated);
    return await getUserById(userInserted.id)
}

export const getUserById = async (id: number) => {
    const userRepository = InitAppSource.getRepositoryEntityInstance(User);
    const user = await userRepository.findOne({
        where:{id},
        select:[
        'id', 
        'email',
        'lastName',
        'firstName',
        'createdDate',
        'updatedDated'
        ]
    });
    
    if (!user) return null
    return user
}