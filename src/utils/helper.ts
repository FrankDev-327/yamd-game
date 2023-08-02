import * as bcrypt from 'bcrypt';

export const comparingPassword = async (plainText, hashed) => {
    return await bcrypt.compare(plainText, hashed);
}

export const hashingPass = async (plainText) => {
    return await bcrypt.hash(plainText, 10);
}
