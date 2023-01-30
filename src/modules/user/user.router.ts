import Routes from '@interfaces/router.interface';
import authMiddleware from '@middlewares/auth.middleware';
import OtpCntroller from '@modules/otp/otp.controller';
import { Router } from 'express';
import UsersController from './user.controller';

class UserRouter implements Routes {
    public path = '/users';
    public router = Router();
    public usersController = new UsersController();
    public otpController = new OtpCntroller();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            `${this.path}`,
            authMiddleware,
            this.usersController.getUsers
        );

        this.router.get(`${this.path}/:id`, this.usersController.getUserById);
        // this.router.get(
        //     `${this.path}/phone/x`,
        //     this.usersController.getUserByPhone
        // );

        this.router.patch(
            `${this.path}/:id/avater`,
            authMiddleware,
            this.usersController.updateAvater
        );

        this.router.post(`${this.path}`, this.usersController.createUser);
    }
}

export default UserRouter;
