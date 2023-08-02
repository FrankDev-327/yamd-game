import { User } from "../../entity/User";
import { IUserPayload } from "../../interfaces/user.interface";
import { InitAppSource } from "../../init-db/init.db";


export const getAllUsers = async () => {
    const userRepository = InitAppSource.getRepositoryEntityInstance(User);
    return await userRepository.find();
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

export const updateUser = async (user:User) => {
    const userRepository = InitAppSource.getRepositoryEntityInstance(User);
    return await userRepository.update(user.id, {...user});
}

export const getUserById = async (id: number) => {
    const userRepository = InitAppSource.getRepositoryEntityInstance(User);
    const user = await userRepository.findOne({
        where:{id},
        select:[
        'id', 
        'nickName',
        'createdDate',
        'updatedDated'
        ],
        relations: ['scores']
    });
    
    if (!user) return null
    return user
}