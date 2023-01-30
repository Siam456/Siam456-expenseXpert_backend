import { ICosmetics } from './cosmetics.interface';
import mongoose, { Schema } from 'mongoose';

const cosmeticsSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        color: {
            type: String,
            //   required: true,
            default: 'Red',
        },
        petals: {
            type: Number,
            default: 0,
        },
        count: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const Cosmetics = mongoose.model<ICosmetics>('cosmetics', cosmeticsSchema);

export default Cosmetics;
