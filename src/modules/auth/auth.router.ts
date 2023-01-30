import { LoginUserDto } from './../user/user.dto';
import { CreateOtp } from './../otp/otp.dto';
import OtpCntroller from '@modules/otp/otp.controller';
import { CreateUserWithProvider, LoginWithOtp, VerifyOtpDto } from './auth.dto';
import Routes from '@interfaces/router.interface';
import { Router } from 'express';
import AuthController from './auth.controller';
import validationMiddleware from '@middlewares/validator.middleware';

class AuthRouter implements Routes {
    public path = '/';
    public router = Router();

    public authController = new AuthController();
    public otpController = new OtpCntroller();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post(
            `${this.path}connect-with-provider`,
            validationMiddleware(CreateUserWithProvider, 'body'),
            this.authController.connectViaProvider
        );
        // this.router.post(
        //     `${this.path}connect-with-provider/:token`,
        //     validationMiddleware(CreateUserWithProvider, 'body'),
        //     this.authController.connectViaProvider
        // );

        this.router.post(
            `${this.path}app-registration/otp`,
            validationMiddleware(CreateOtp, 'body'),
            this.otpController.createOtp
        );
        this.router.post(
            `${this.path}app-login/otp`,
            validationMiddleware(LoginWithOtp, 'body'),
            this.otpController.logInWithOtp
        );
        this.router.post(
            `${this.path}app-verification/otp`,
            validationMiddleware(VerifyOtpDto, 'body'),
            this.authController.VerifyOtp
        );
    }
}

export default AuthRouter;
