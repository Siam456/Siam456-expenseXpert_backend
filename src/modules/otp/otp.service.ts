import { logger } from '@utils/logger';
import OtpDao from './otp.dao';
import { CreateOtp } from './otp.dto';
import { IOtp } from './otp.interface';
import bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';

class OtpService {
    public otpDao = new OtpDao();

    public createOtp = async (otpData): Promise<IOtp> => {
        const { name, phone } = otpData;

        const OTP: string = await otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        logger.warn(OTP);

        const salt = await bcrypt.genSalt(10);
        const hashedOTP: string = await bcrypt.hash(OTP, salt);

        const newUser: IOtp = await this.otpDao.create({
            name,
            phone,
            otp: hashedOTP,
        });

        return newUser;
    };

    public getAllOtps = async (): Promise<IOtp[]> => {
        return await this.otpDao.findAll();
    };
    public getOtp = async (id: string): Promise<IOtp> => {
        return await this.otpDao.findById(id);
    };

    public findOtpWithPhone = async (phone: string): Promise<IOtp[]> => {
        return await this.otpDao.findOtpWithPhone(phone);
    };

    public deleteManyByPhone = async (phone: string): Promise<void> => {
        await this.otpDao.deleteManyByPhone(phone);
    };
}

export default OtpService;
