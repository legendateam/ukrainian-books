import { NextFunction, Response } from 'express';

import { ILogin, IRequest } from '../interfaces';
import { emailSchema, loginSchema, userSchema } from '../utils';
import { ErrorHandler } from '../error';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { bcryptService, clientService, userService } from '../services';
import { errorMessageConstant, requestConstant } from '../constants';
import { Users } from '../entities';
import { ClientKeyEnum } from '../enums/client-key.enum';

class AuthMiddleware {
    public validateBodyLogin(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { body } = req;
            const { value, error } = loginSchema.validate(body);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.login = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public validateBodyRegistration(req: IRequest, _: Response, next: NextFunction): void {
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

    public async checkIsAlreadyExists(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.login as ILogin;
            const user = await userService.getOneByEmail(email);

            if (user) {
                next(new ErrorHandler(errorMessageConstant.userAlreadyExists, HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserIsAuth(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.login as ILogin;
            const user = await userService.getOneByEmail(email);

            if (!user) {
                next(new ErrorHandler(errorMessageConstant.userNotFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkPassword(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { password } = req.login as ILogin;
            const { password: passwordFromDB } = req.user as Users;

            const resultAfterChecked = await bcryptService.compare(password, passwordFromDB);

            if (!resultAfterChecked) {
                next(new ErrorHandler(errorMessageConstant.unauthorized, HttpStatusEnum.UNAUTHORIZED, HttpMessageEnum.UNAUTHORIZED));
                return;
            }
        } catch (e) {
            next(e);
        }
    }

    public async checkClientExistsKeys(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { nickName } = req.user as Users;
            const authData = await clientService.get(nickName);

            if (authData) {
                const keys = await clientService.getKeysByNickName(nickName);
                const lastKey = keys.slice(-1);
                const numberKey = lastKey[0]?.split(':')[2] as string;

                if (Number(numberKey) < 0) {
                    next(new ErrorHandler(
                        errorMessageConstant.clientKey,
                        HttpStatusEnum.INTERNAL_SERVER_ERROR,
                        HttpMessageEnum.INTERNAL_SERVER_ERROR,
                    ));
                    return;
                }

                const key = clientService.generateKey(nickName, ClientKeyEnum.AUTH_TOKENS, Number(numberKey));

                req.clientKey = key;
                next();
            }

            const key = clientService.generateKey(nickName, ClientKeyEnum.AUTH_TOKENS);
            req.clientKey = key;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isAuthorization(req: IRequest, _: Response, next: NextFunction) {
        try {
            const authorization = req.get(requestConstant.AUTHORIZATION);

            if (!authorization) {
                next(new ErrorHandler(
                    errorMessageConstant.authorization,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            req.authorization = authorization;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkAuthorizationOnBearer(req: IRequest, _: Response, next: NextFunction) {
        try {
            const authorization = req.authorization as string;
            const bearer = authorization.split(' ')[0];

            if (bearer !== requestConstant.BEARER) {
                next(new ErrorHandler(
                    errorMessageConstant.authorization,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public validateEmail(req: IRequest, _: Response, next: NextFunction) {
        try {
            const { body } = req;
            const { value, error } = emailSchema.validate(body);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.email = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}
export const authMiddleware = new AuthMiddleware();
