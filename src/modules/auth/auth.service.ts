import { BasicUser } from './../user/user.interface';
import { RequestWithUserToken } from './auth.interface';
import { RequestWithUser } from '@modules/auth/auth.interface';
import UserDao from '@modules/user/user.dao';
import { envVarse } from './../../configs/index';

import { generateToken } from '@utils/tool';

class AuthServices {
    private userDao = new UserDao();
    public connectWithProvider = async (
        userData: BasicUser
    ): Promise<RequestWithUserToken> => {
        const _user = await this.userDao.findUserByEmail(userData.email);
        if (_user) {
            const payload = _user;
            const generatedToken = generateToken(
                payload,
                envVarse.JWT_SECRET,
                '3d'
            );

            return {
                user: payload,
                token: generatedToken,
            };
        } else {
            const newUser = await this.userDao.create(userData);

            const generatedToken = generateToken(
                newUser,
                envVarse.JWT_SECRET,
                '3d'
            );

            return {
                user: newUser,
                token: generatedToken,
            };
        }
    };
}

export default AuthServices;
