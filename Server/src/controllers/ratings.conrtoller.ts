import { NextFunction } from 'express';

import {IRating, IRequest, IResponse} from '../interfaces';
import { Ratings } from '../entities';
import { ratingRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';

class RatingsController {
    public async createOne(req: IRequest, res: IResponse<Ratings>, next: NextFunction)
        : Promise<IResponse<Ratings> | undefined> {
        try {
            const rating = req.rating as IRating;
            const ratingCreated = await ratingRepository.createOne(rating);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: ratingCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const ratingsController = new RatingsController();
