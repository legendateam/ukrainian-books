import { NextFunction } from 'express';

import { userRepository } from '../repositories';
import { Users } from '../entities';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { IRequest, IResponse } from '../interfaces';

class UsersController {
    public async getAll(_: IRequest, res: IResponse<Users[]>, next: NextFunction): Promise<IResponse<Users[]> | undefined> {
        try {
            const users = await userRepository.getAll();
            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: users,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const usersController = new UsersController();
