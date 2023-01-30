import Routes from '@interfaces/router.interface';
import { Router } from 'express';
import OtpCntroller from './otp.controller';
class OtpRoute implements Routes {
    public path = '/otp';
    public router = Router();

    public otpController = new OtpCntroller();

    constructor() {
        this.initializeRoutes();
    }
    public initializeRoutes() {
        this.router.get(`${this.path}`, this.otpController.getOtp);
        this.router.get(`${this.path}/:id`, this.otpController.getOtpId);
        this.router.post(`${this.path}`, this.otpController.createOtp);
    }
}

export default OtpRoute;
