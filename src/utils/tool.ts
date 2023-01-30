import { BasicUser } from './../modules/user/user.interface';

import jwt from 'jsonwebtoken';

export const generateToken = (
    payload: BasicUser | null,
    secret: string,
    expiry: string
) => {
    return jwt.sign({ payload }, secret, {
        expiresIn: expiry,
    });
};
