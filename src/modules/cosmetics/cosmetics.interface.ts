import { Types, Document } from 'mongoose';
export interface ICosmetics extends Document {
    name: string;
    color: string;
    petals: number;
    count: number;
    uses: Types.ObjectId;
}
export interface ICosmeticsCount extends Document {
    totalNumberOfFlower: number;
    totalNumberOfUniqueFlower: number;
}
