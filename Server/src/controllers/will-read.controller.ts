import { NextFunction } from 'express';

import { IRequestWillRead, IResponse, IWillRead } from '../interfaces';
import { WillRead } from '../entities';
import { willReadRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';

class WillReadController {
    public async createOne(req: IRequestWillRead, res: IResponse<WillRead>, next: NextFunction)
        : Promise<IResponse<WillRead> | undefined> {
        try {
            const willRead = req.willRead as IWillRead;
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
