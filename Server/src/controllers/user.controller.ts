import { NextFunction } from 'express';

import { userRepository } from '../repositories';
import { User } from '../entities/user.entity';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { IRequestUser, IResponse } from '../interfaces';
import { IUser } from '../interfaces/user.interface';

class UserController {
    public async createOne(req: IRequestUser, res: IResponse<User>, next: NextFunction): Promise<IResponse<User> | undefined> {
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

export const userController = new UserController();
