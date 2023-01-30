import { NextFunction, Request, Response } from 'express';

class IndexController {
    public index = (_: Request, res: Response, next: NextFunction): void => {
        try {
            res.status(200).send('this is main endpoint!!');
        } catch (error) {
            next(error);
        }
    };
}

export default IndexController;
