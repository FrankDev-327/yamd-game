import * as jwt from 'jsonwebtoken';

export const generateToken = async  (id: number) => {
    return await jwt.sign({ id: id }, 'secret', {expiresIn: 60000});
}

export const decodeToken = async (token: string) => {
    return await jwt.verify(token, 'secret');
} 