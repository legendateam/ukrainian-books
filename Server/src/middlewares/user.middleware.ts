import { NextFunction, Response } from 'express';

import { userService } from '../services';
import { ErrorHandler } from '../error';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { userSchema } from '../utils';
import { IRequestUser } from '../interfaces';
import { IUser } from '../interfaces';

class UserMiddleware {
    public validationBody(req: IRequestUser, _: Response, next: NextFunction): void {
        try {
            const { body } = req;
            const { value, error } = userSchema.validate(body);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsAlreadyExists(req: IRequestUser, _: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user as IUser;
            const userFromDB = await userService.getOneByEmailOrNickName(user);

            if (userFromDB) {
                next(new ErrorHandler('User is already exists', HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}
export const userMiddleware = new UserMiddleware();
