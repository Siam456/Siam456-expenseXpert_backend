import HttpException from '@exceptions/HttpException';
import UserServices from '@modules/user/user.service';
import CosmeticsService from './cosmetics.service';
import { Request, Response, NextFunction } from 'express';

class CosmeticsController {
    private cosmeticsService = new CosmeticsService();
    private userServices = new UserServices();

    public cosmeticsUpsertAndCount = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;
        try {
            const _user = await this.userServices.findById(id);
            if (_user === null) {
                throw new HttpException(400, 'User not found!!');
            } else {
                const count = await this.cosmeticsService.getCosmeticsCount(id);
                res.status(200).send({
                    data: count,
                    message: 'cosmetics added..',
                });
            }
        } catch (err) {
            next(err);
        }
    };
}

export default CosmeticsController;
