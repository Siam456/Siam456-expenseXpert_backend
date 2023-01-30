import { IOtp } from './otp.interface';
import mongoose, { Schema } from 'mongoose';

const otpSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: false,
        },
        createdAt: { type: Date, default: Date.now, index: { expires: 120 } },
    },
    {
        timestamps: true,
    }
);

const Otp = mongoose.model<IOtp>('Otp', otpSchema);

export default Otp;
