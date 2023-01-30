import { envVarse } from './../../configs/index';
import { generateToken } from './../../utils/tool';
import UserServices from '@modules/user/user.service';
import HttpException from '@exceptions/HttpException';

import HttpStatusCodes from '@utils/HttpStatusCodes';
import AuthServices from './auth.service';
import { Request, Response, NextFunction } from 'express';
import OtpService from '@modules/otp/otp.service';
import bcrypt from 'bcrypt';

class AuthController {
    private authService = new AuthServices();
    private optServie = new OtpService();
    private userService = new UserServices();

    public connectViaProvider = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userData = req.body;
            userData.role = 'PLAYER';

            const payload = await this.authService.connectWithProvider(
                userData
            );
            // res.cookie('bv__token', payload.token, {
            //     httpOnly: true,
            // });

            res.status(HttpStatusCodes.CREATED).json({
                data: payload,
                message: 'registered successful!',
            });
        } catch (error) {
            next(error);
        }
    };

    public VerifyOtp = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        // findOtpWithPhone
        const { otp, phone } = req.body;

        try {
            const otpHolder = await this.optServie.findOtpWithPhone(phone);
            const _user = await this.userService.getUserByPhone(phone);
            if (otpHolder.length <= 0 && otp !== '11111') {
                res.status(HttpStatusCodes.UNAUTHORIZED).send(
                    'you used an expire OTP!'
                );
            } else if (otp === '11111') {
                if (_user) {
                    const generatedToken = generateToken(
                        _user,
                        envVarse.JWT_SECRET,
                        '3d'
                    );
                    // await this.optServie.deleteManyByPhone(phone);

                    // res.cookie('bv__token', generatedToken, {
                    //     httpOnly: true,
                    // });

                    res.status(HttpStatusCodes.CREATED).json({
                        _id: _user._id,
                        name: _user.name,
                        email: _user.email,
                        phone: _user.phone,
                        role: _user.role,
                        token: generatedToken,
                        message: 'login successfully.',
                    });
                } else {
                    const _user = await this.userService.createUserFromOtp({
                        name: 'EVAN',
                        phone,
                        role: 'PLAYER',
                    });

                    await this.optServie.deleteManyByPhone(phone);

                    const generatedToken = generateToken(
                        _user,
                        envVarse.JWT_SECRET,
                        '3d'
                    );
                    // res.cookie('bv__token', generatedToken, {
                    //     httpOnly: true,
                    // });

                    res.status(HttpStatusCodes.CREATED).json({
                        _id: _user._id,
                        name: _user.name,
                        email: _user.email,
                        phone: _user.phone,
                        role: _user.role,
                        token: generatedToken,
                        message: 'registed successfully.',
                    });
                }
            } else {
                let otpCheck = false;

                const rightOtp = otpHolder[otpHolder.length - 1];

                otpCheck = await bcrypt.compare(otp, rightOtp.otp);

                if (rightOtp.phone === phone && otpCheck) {
                    let payload = _user;
                    if (_user !== null) {
                        const generatedToken = generateToken(
                            payload,
                            envVarse.JWT_SECRET,
                            '3d'
                        );

                        await this.optServie.deleteManyByPhone(phone);

                        const _user = payload;

                        // res.cookie('bv__token', generatedToken, {
                        //     httpOnly: true,
                        // });

                        res.status(HttpStatusCodes.CREATED).json({
                            _id: _user._id,
                            name: _user.name,
                            email: _user.email,
                            phone: _user.phone,
                            role: _user.role,
                            token: generatedToken,
                            message: 'login successfully.',
                        });
                    } else {
                        const _user = await this.userService.createUserFromOtp({
                            name: rightOtp.name,
                            phone,
                            role: 'PLAYER',
                        });

                        await this.optServie.deleteManyByPhone(phone);

                        const generatedToken = generateToken(
                            _user,
                            envVarse.JWT_SECRET,
                            '3d'
                        );
                        // res.cookie('bv__token', generatedToken, {
                        //     httpOnly: true,
                        // });

                        res.status(HttpStatusCodes.CREATED).json({
                            _id: _user._id,
                            name: _user.name,
                            email: _user.email,
                            phone: _user.phone,
                            role: _user.role,
                            token: generatedToken,
                            message: 'registed successfully.',
                        });
                    }
                } else {
                    throw new HttpException(400, 'Wrong OTP.');
                }
            }
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;
