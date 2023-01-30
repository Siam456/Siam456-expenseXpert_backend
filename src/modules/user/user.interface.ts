import { Types, Document } from 'mongoose';

export interface BasicUser extends Document {
    _id: Types.ObjectId;
    name: string;
    phone: string;
    email: string;
    avater: string;
    role: string;
}
