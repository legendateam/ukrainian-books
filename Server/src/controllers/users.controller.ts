import { NextFunction } from 'express';

import { userRepository } from '../repositories';
import { Users } from '../entities';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { IRequest, IResponse, IUser } from '../interfaces';
import { bcryptService } from '../services';

class UsersController {
    public async createOne(req: IRequest, res: IResponse<Users>, next: NextFunction): Promise<IResponse<Users> | undefined> {
        try {
            const user = req.body as IUser;
            const hashedPassword = await bcryptService.hash(user.password);

            const userCreated = await userRepository.createOne({ ...user, password: hashedPassword });

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: userCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

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
