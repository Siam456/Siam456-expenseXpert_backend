import { Schema, model } from 'mongoose';
import { BasicUser } from './user.interface';

const userSchema = new Schema(
    {
        name: {
            type: String,
            requied: true,
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        avater: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            default: 'PLAYER',
        },
    },
    {
        timestamps: true,
    }
);

const User = model<BasicUser>('user', userSchema);
export default User;
