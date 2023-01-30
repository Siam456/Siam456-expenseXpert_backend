import { Router } from 'express';
import IndexController from './index.controller';
import Routes from '@interfaces/router.interface';

class IndexRoute implements Routes {
    public path = '/';
    public router = Router();
    public indexController = new IndexController();

    constructor() {
        this.initilizeRouter();
    }

    private initilizeRouter(): void {
        this.router.get(`${this.path}`, this.indexController.index);
    }
}

export default IndexRoute;
