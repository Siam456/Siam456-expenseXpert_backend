import { ICosmetics, ICosmeticsCount } from './cosmetics.interface';
import Cosmetics from './cosmetics.model';

class CosmeticsDao {
    public async upsert(userid: string): Promise<ICosmetics> {
        return await Cosmetics.findOneAndUpdate(
            { user: userid },
            {
                $set: {
                    user: userid,
                    name: 'FLOWER',
                },
                $inc: {
                    count: 1,
                },
            },
            { upsert: true, returnOriginal: false }
        );
    }
    public async getCosmeticsCount(): Promise<ICosmeticsCount[]> {
        return await Cosmetics.aggregate([
            {
                $group: {
                    _id: null,
                    totalNumberOfFlower: {
                        $sum: '$count',
                    },
                    totalNumberOfUniqueFlower: {
                        $sum: 1,
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ]);
    }
}

export default CosmeticsDao;
