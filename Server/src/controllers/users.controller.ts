import { NextFunction } from 'express';

import { userRepository } from '../repositories';
import { Users } from '../entities';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { IRequest, IResponse, IUser } from '../interfaces';

class UsersController {
    public async createOne(req: IRequest, res: IResponse<Users>, next: NextFunction): Promise<IResponse<Users> | undefined> {
        try {
            const user = req.user as IUser;
            const userCreated = await userRepository.createOne(user);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: userCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const usersController = new UsersController();
