import mongoose from 'mongoose';
export interface IOtp extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    phone: string;
    otp: string;
    createdAt: string;
}
