import { Request, Response, NextFunction } from 'express';

import HttpException from '@exceptions/HttpException';

function errorMiddleWare(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    try {
        const status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong';

        // logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        res.status(status).json({ status, message });
    } catch (error) {
        next(error);
    }
}

export default errorMiddleWare;
