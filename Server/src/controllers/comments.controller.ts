import { NextFunction } from 'express';

import { IComment, IRequest, IResponse } from '../interfaces';
import { Comments } from '../entities';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { commentRepository } from '../repositories';
import { clientService } from '../services';

class CommentsController {
    public async createOne(req: IRequest, res: IResponse<Comments>, next: NextFunction)
        : Promise<IResponse<Comments> | undefined> {
        try {
            const comment = req.body as IComment;
            const commentCreated = await commentRepository.createOne(comment);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: commentCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async addAction(req: IRequest, res: IResponse<any>, next: NextFunction)
    : Promise<IResponse<any> | undefined> {
        try {
            const {
                like, disLike, userId, commentId,
            } = req.body as any;
            if (like) {
                const newVar = await clientService.set(`${userId}${commentId}`, JSON.stringify({ like }));
                return res.status(HttpStatusEnum.CREATED).json({
                    status: HttpStatusEnum.CREATED,
                    message: HttpMessageEnum.CREATED,
                    data: newVar,
                });
            }
            if (disLike) {
                const newVar = await clientService.set(`${userId}${commentId}`, disLike);
                return res.status(HttpStatusEnum.CREATED).json({
                    status: HttpStatusEnum.CREATED,
                    message: HttpMessageEnum.CREATED,
                    data: newVar,
                });
            }
        } catch (e) {
            next(e);
        }
    }
}
export const commentsController = new CommentsController();
