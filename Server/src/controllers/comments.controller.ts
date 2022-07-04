import { NextFunction } from 'express';

import { IComment, IRequestComment, IResponse } from '../interfaces';
import { Comments } from '../entities';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { commentRepository } from '../repositories';

class CommentsController {
    public async createOne(req: IRequestComment, res: IResponse<Comments>, next: NextFunction)
        : Promise<IResponse<Comments> | undefined> {
        try {
            const comment = req.comment as IComment;
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
}
export const commentsController = new CommentsController();
