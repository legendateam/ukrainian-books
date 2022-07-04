import { NextFunction } from 'express';

import { IAlreadyRead, IRequestAlreadyRead, IResponse } from '../interfaces';
import { AlreadyRead } from '../entities';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { alreadyReadRepository } from '../repositories';

class AlreadyReadController {
    public async createOne(req: IRequestAlreadyRead, res: IResponse<AlreadyRead>, next: NextFunction)
        : Promise<IResponse<AlreadyRead> | undefined> {
        try {
            const alreadyReadBook = req.alreadyReadBook as IAlreadyRead;

            const alreadyReadBookFromDB = await alreadyReadRepository.createOne(alreadyReadBook);
            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: alreadyReadBookFromDB,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const alreadyReadController = new AlreadyReadController();
