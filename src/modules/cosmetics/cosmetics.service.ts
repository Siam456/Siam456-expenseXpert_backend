import CosmeticsDao from './cosmetics.dao';

class CosmeticsService {
    private cosmeticsDao = new CosmeticsDao();

    public getCosmeticsCount = async (id: string) => {
        const _cosmetics = await this.cosmeticsDao.upsert(id);
        const totalFlower = await this.cosmeticsDao.getCosmeticsCount();
        return { thisPalyersGivenFlower: _cosmetics.count, ...totalFlower[0] };
    };
}

export default CosmeticsService;
