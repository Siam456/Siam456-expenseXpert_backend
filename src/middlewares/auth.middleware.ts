import { envVarse } from 'configs';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '@exceptions/HttpException';
import { RequestWithUser } from '@modules/auth/auth.interface';

import { DataStoredInToken } from '@interfaces/token.interface';
import UserDao from '@modules/user/user.dao';

const authMiddleware = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const userDao = new UserDao();
    try {
        const Authorization =
            req.header('authorization').split('Bearer ')[1] || null;

        if (Authorization) {
            const secretKey: string = envVarse.JWT_SECRET;
            const verificationResponse = (await jwt.verify(
                Authorization,
                secretKey
            )) as DataStoredInToken;
            const userId = verificationResponse._id;
            const findUser = userDao.findById(userId);

            if (findUser) {
                req.body.user = findUser;
                next();
            } else {
                next(new HttpException(401, 'Wrong authentication token'));
            }
        } else {
            next(new HttpException(404, 'Authentication token missing'));
        }
    } catch (error) {
        next(new HttpException(401, 'Wrong authentication token'));
    }
};

export default authMiddleware;
