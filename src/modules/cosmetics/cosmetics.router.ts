import authMiddleware from '@middlewares/auth.middleware';
import { Router } from 'express';
import Routes from '@interfaces/router.interface';
import CosmeticsController from './cosmetics.controller';

class CosmeticsRouter implements Routes {
    public path = '/users';
    public router = Router();
    private cosmeticsController = new CosmeticsController();

    constructor() {
        this.initilizeRoute();
    }

    public initilizeRoute = async () => {
        this.router.patch(
            `${this.path}/:id/giveCosmetics`,
            authMiddleware,
            this.cosmeticsController.cosmeticsUpsertAndCount
        );
    };
}

export default CosmeticsRouter;
