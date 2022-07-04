import { NextFunction } from 'express';

import { ILike, IRequestLike, IResponse } from '../interfaces';
import { Likes } from '../entities';
import { likeRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';

class LikesController {
    public async createOne(req: IRequestLike, res: IResponse<Likes>, next: NextFunction) {
        try {
            const like = req.like as ILike;
            const likeCreated = await likeRepository.createOne(like);

            res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: likeCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const likesController = new LikesController();
