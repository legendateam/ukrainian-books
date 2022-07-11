import { NextFunction, Response } from 'express';

import {
    IClientKey, IEmailRequest, ILogin, IPayload, IRequest, IResponse, IUser,
} from '../interfaces';
import {
    clientKeySchema, emailSchema, loginSchema, passwordSchema, tokenSchema, userSchema,
} from '../utils';
import { ErrorHandler } from '../error';
import {
    bcryptService, clientService, jwtService, userService,
} from '../services';
import { errorMessageConstant, requestConstant } from '../constants';
import { Users } from '../entities';
import { ITokensPair } from '../interfaces/tokens-pair.interface';
import {
    ClientKeyEnum, HttpMessageEnum, HttpStatusEnum, TokensEnum,
} from '../enums';

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
            req.email = value.email;
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

    public async checkUserOnUnique(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { email, nickName } = req.user as IUser;
            const user = await userService.getOneByEmailOrNickName({ nickName, email });

            if (user) {
                next(new ErrorHandler(errorMessageConstant.userAlreadyExists, HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserAuthByEmail(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const email = req.email as IEmailRequest;
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

    public async checkUserAuthByPayload(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { nickName: nickNamePayload } = req.payload as IPayload;
            const nickName = nickNamePayload as string;
            const user = await userService.getOneByEmailOrNickName({ nickName });

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

            next();
        } catch (e) {
            next(e);
        }
    }

    public async isAuthorization(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const authorization = req.get(requestConstant.AUTHORIZATION) as string;

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

    public validateAuthorizationToken(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const authorization = req.authorization as string;
            const token = authorization.split(' ')[1];

            if (!token) {
                next(new ErrorHandler(
                    errorMessageConstant.authorization,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            const { error } = tokenSchema.validate({ token });

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                next();
                return;
            }

            req.authorization = token;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkAuthorizationOnBearer(req: IRequest, _: Response, next: NextFunction): Promise<void> {
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

    public validateEmail(req: IRequest, _: Response, next: NextFunction): void {
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

    public async verifyAccessToken(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.authorization as string;
            const { nickName } = jwtService.verify(token) as IPayload;

            if (!nickName) {
                next(
                    new ErrorHandler(
                        errorMessageConstant.unauthorized,
                        HttpStatusEnum.UNAUTHORIZED,
                        HttpMessageEnum.UNAUTHORIZED,
                    ),
                );
                return;
            }

            req.payload = { nickName };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async verifyRefreshToken(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.authorization as string;
            const { nickName, role, id } = jwtService.verify(token, TokensEnum.REFRESH) as IPayload;

            if (!nickName || !role || !id) {
                next(
                    new ErrorHandler(
                        errorMessageConstant.unauthorized,
                        HttpStatusEnum.UNAUTHORIZED,
                        HttpMessageEnum.UNAUTHORIZED,
                    ),
                );
                return;
            }

            req.payload = { nickName, role, id };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async verifyForgotToken(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.authorization as string;
            const { nickName, role, id } = jwtService.verify(token, TokensEnum.FORGOT) as IPayload;

            if (!nickName) {
                next(
                    new ErrorHandler(
                        errorMessageConstant.unauthorized,
                        HttpStatusEnum.UNAUTHORIZED,
                        HttpMessageEnum.UNAUTHORIZED,
                    ),
                );
                return;
            }

            req.payload = { nickName, role, id };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async wasItIssuedToken(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const key = req.clientKey as string;

            const keyFromDB = await clientService.getKey(key);

            if (!keyFromDB) {
                next(
                    new ErrorHandler(
                        errorMessageConstant.unauthorized,
                        HttpStatusEnum.UNAUTHORIZED,
                        HttpMessageEnum.UNAUTHORIZED,
                    ),
                );
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public isClientKey(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { body } = req;

            const { error } = clientKeySchema.validate(body);

            if (error) {
                next(
                    new ErrorHandler(
                        error.message,
                        HttpStatusEnum.BAD_REQUEST,
                        HttpMessageEnum.BAD_REQUEST,
                    ),
                );
                return;
            }

            const { clientKey } = body as IClientKey;
            req.clientKey = clientKey;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async alreadyExistsForgotToken(req: IRequest, _: IResponse<ITokensPair>, next: NextFunction): Promise<void> {
        try {
            const { nickName } = req.user as Users;

            const anyKeysByNickName = await clientService.getAnyKeysByNickName(nickName, ClientKeyEnum.FORGOT);

            if (anyKeysByNickName.length) {
                const deleted = await clientService.delete(anyKeysByNickName[0]);

                if (!deleted) {
                    next(new ErrorHandler(
                        errorMessageConstant.unknown,
                        HttpStatusEnum.INTERNAL_SERVER_ERROR,
                        HttpMessageEnum.INTERNAL_SERVER_ERROR,
                    ));
                }
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public isPassword(req: IRequest, _: IResponse<ITokensPair>, next: NextFunction): void {
        try {
            const { body } = req.body;
            const { value, error } = passwordSchema.validate(body);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.password = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}
export const authMiddleware = new AuthMiddleware();
