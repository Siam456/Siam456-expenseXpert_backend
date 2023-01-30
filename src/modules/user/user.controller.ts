import { BasicUser } from './user.interface';
import { CreateUserDto } from './user.dto';
import { Request, Response, NextFunction } from 'express';
import UserServices from './user.service';

class UsersController {
    public userServices = new UserServices();

    public getUsers = async (_: Request, res: Response, next: NextFunction) => {
        const findAllUsersData: BasicUser[] =
            await this.userServices.getAllUsers();
        res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    };

    public getUserById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const _user = await this.userServices.findById(req.params.id);
            res.status(200).json({ data: _user, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userData: CreateUserDto = req.body;
            const createUserData: BasicUser =
                await this.userServices.createUser(userData);
            res.status(201).json({ data: createUserData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };
    public getUserByPhone = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { phone } = req.body;
            const _user = await this.userServices.getUserByPhone(phone);
            res.status(200).json({
                data: _user,
                message: 'find user by phone',
            });
        } catch (error) {
            next(error);
        }
    };
    public updateAvater = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { avater } = req.body;
            const { id } = req.params;
            await this.userServices.UpdateUserAvater(id, avater);

            res.status(200).json({
                message: 'avater update successfully!',
            });
        } catch (error) {
            next(error);
        }
    };
    
}

export default UsersController;
