import {
    CreateUserDto,
    createUserWithOtpDto,
    UpdateAvaterDto,
} from './user.dto';
import HttpException from '@exceptions/HttpException';
import { BasicUser } from './user.interface';
import User from './user.model';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import UserDao from './user.dao';
import { Types } from 'mongoose';

class UserServices {
    private userDao = new UserDao();
    public findById = async (id: string) => {
        return await this.userDao.findById(id);
    };
    public findUserByEmail = async (email: string) => {
        return await this.userDao.findUserByEmail(email);
    };

    public createUser = async (userData: CreateUserDto): Promise<BasicUser> => {
        const { name, phone, email } = userData;

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser: BasicUser = await this.userDao.create({
            name,
            phone,
            email,
            password: hashedPassword,
        });

        return newUser;
    };
    public createUserFromOtp = async (
        userData: createUserWithOtpDto
    ): Promise<BasicUser> => {
        const newUser: BasicUser = await this.userDao.create(userData);

        return newUser;
    };

    public getAllUsers = async (): Promise<BasicUser[]> => {
        const _users = await User.find();
        return _users;
    };

    public getUserByPhone = async (phone: string): Promise<BasicUser> => {
        return await this.userDao.findUserWithPhone(phone);
    };
    public UpdateUserAvater = async (
        id: string,
        avater: UpdateAvaterDto
    ): Promise<typeof User | null> => {
        return await this.userDao.updateAvater(id, avater);
    };
}

export default UserServices;
