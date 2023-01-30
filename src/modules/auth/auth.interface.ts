import { BasicUser } from './../user/user.interface';

import { Request } from 'express';
import { Types } from 'mongoose';

export interface RequestWithUser extends Request {
    user: BasicUser;
}

export interface RequestWithUserToken {
    user: BasicUser;
    token: string;
}
