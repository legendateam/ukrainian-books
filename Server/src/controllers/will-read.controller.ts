import { NextFunction } from 'express';

import { IRequest, IResponse, IWillRead } from '../interfaces';
import { WillRead } from '../entities';
import { willReadRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';

class WillReadController {
    public async createOne(req: IRequest, res: IResponse<WillRead>, next: NextFunction)
        : Promise<IResponse<WillRead> | undefined> {
        try {
            const willRead = req.body as IWillRead;
            const willReadCreated = await willReadRepository.createOne(willRead);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: willReadCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const willReadController = new WillReadController();
