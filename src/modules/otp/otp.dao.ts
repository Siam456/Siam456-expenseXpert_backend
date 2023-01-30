import { IOtp } from './otp.interface';
import Otp from './otp.model';
class OtpDao {
    public async findAll(): Promise<IOtp[]> {
        return await Otp.find();
    }
    public async findById(id: string): Promise<IOtp> {
        return await Otp.findById(id);
    }

    public async create({ name, phone, otp }): Promise<IOtp> {
        const newOtp = new Otp({ name, phone, otp });
        const _otp = await newOtp.save();
        return _otp;
    }

    public async findOtpWithPhone(phone: string): Promise<IOtp[]> {
        return await Otp.find({ phone: phone });
    }
    public async deleteManyByPhone(phone: string): Promise<void> {
        await Otp.deleteMany({ phone: phone });
    }
}

export default OtpDao;
