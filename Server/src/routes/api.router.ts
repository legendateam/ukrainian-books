import {
    Request, Response, NextFunction, Router,
} from 'express';

import { userRouter } from './user.router';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../error';

export const apiRouter = Router();

apiRouter.use('/users', userRouter);
// @ts-ignore
apiRouter.use('*', (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        error: err?.error || HttpMessageEnum.INTERNAL_SERVER_ERROR,
        status: err?.status || HttpStatusEnum.INTERNAL_SERVER_ERROR,
    });
});
