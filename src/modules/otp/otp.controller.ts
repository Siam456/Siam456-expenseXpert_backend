import HttpException from '@exceptions/HttpException';
import { CreateOtp } from './otp.dto';
import { IOtp } from './otp.interface';
import OtpService from './otp.service';
import { Request, Response, NextFunction } from 'express';
import UserServices from '@modules/user/user.service';
import HttpStatusCodes from '@utils/HttpStatusCodes';
import bcrypt from 'bcrypt';
import { generateToken } from '@utils/tool';
import { envVarse } from 'configs';

class OtpCntroller {
    public optServie = new OtpService();
    public userService = new UserServices();

    public getOtp = async (_: Request, res: Response, next: NextFunction) => {
        const findAllOtp: IOtp[] = await this.optServie.getAllOtps();
        res.status(200).json({ data: findAllOtp, message: 'findAll' });
    };

    public getOtpId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const _otp = await this.optServie.getOtp(req.params.id);
            res.status(200).json({ data: _otp, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createOtp = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const otpData: CreateOtp = req.body;

            const user = await this.userService.getUserByPhone(otpData.phone);

            if (user !== null) {
                throw new HttpException(
                    HttpStatusCodes.UNAUTHORIZED,
                    'user already registred. please Login!'
                );
            } else {
                const createOtpData: IOtp = await this.optServie.createOtp(
                    otpData
                );
                res.status(201).json({
                    data: createOtpData,
                    message: 'otp send successfully!!',
                });
            }
        } catch (error) {
            next(error);
        }
    };
    public logInWithOtp = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const otpData: CreateOtp = req.body;

            const user = await this.userService.getUserByPhone(otpData.phone);

            if (user !== null) {
                const createOtpData = await this.optServie.createOtp({
                    ...otpData,
                    name: user.name,
                });
                res.status(201).json({
                    data: createOtpData,
                    message: 'otp send successfully!!',
                });
            } else {
                throw new HttpException(
                    HttpStatusCodes.UNAUTHORIZED,
                    'User not found. create account first!'
                );
            }
        } catch (error) {
            next(error);
        }
    };

   
}

export default OtpCntroller;
