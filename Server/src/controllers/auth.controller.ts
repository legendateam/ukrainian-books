import { NextFunction } from 'express';

import {
    IForgotToken, IPayload, IRequest, IResponse, ITokensPair, IUser,
} from '../interfaces';
import { authService, s3Service, userService } from '../services';
import {
    EmailEnum, FileEnum, HttpMessageEnum, HttpStatusEnum, ItemTypeFileEnum, MessagesEnum,
} from '../enums';
import { Users } from '../entities';
import { ErrorHandler } from '../error';
import { errorMessageConstant, emailMessagesConstant } from '../constants';
import { emailService } from '../services/email.service';

class AuthController {
    public async login(req: IRequest, res: IResponse<ITokensPair>, next: NextFunction): Promise<IResponse<ITokensPair> | undefined> {
        try {
            const {
                nickName, role, id, email,
            } = req.user as Users;

            const tokensGeneratedAndSaved = await authService.login({ id, role, nickName });

            if (!tokensGeneratedAndSaved) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            const { access, refresh, clientKey } = tokensGeneratedAndSaved as ITokensPair;

            await emailService.sendEmail(email, EmailEnum.WELCOME, { nickName });

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: {
                    access,
                    refresh,
                    clientKey,
                },
            });
        } catch (e) {
            next(e);
        }
    }

    public async registration(req: IRequest, res: IResponse<Users>, next: NextFunction): Promise<IResponse<Users> | undefined> {
        try {
            const {
                nickName, role, email, password,
            } = req.user as IUser;

            const userDB = await authService.registration({
                nickName, role, email, password,
            });

            if (!userDB) {
                next(new ErrorHandler(
                    errorMessageConstant.userNotRegistration,
                    HttpStatusEnum.NOT_IMPLEMENTED,
                    HttpMessageEnum.NOT_IMPLEMENTED,
                ));
                return;
            }

            if (req.file) {
                const userId = userDB.id;
                const avatarSaved = await s3Service.uploadFile(req.file, userId, FileEnum.PHOTOS, ItemTypeFileEnum.USERS);
                const pathFile = avatarSaved.Location;

                await userService.updateAvatar(userId, pathFile);

                return res.status(HttpStatusEnum.CREATED).json({
                    status: HttpStatusEnum.CREATED,
                    data: { ...userDB, avatar: pathFile },
                    message: HttpMessageEnum.CREATED,
                });
            }

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: userDB,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequest, res: IResponse<number>, next: NextFunction): Promise<IResponse<number> | undefined> {
        try {
            const clientKey = req.clientKey as string;
            const deletedTokens = await authService.logout(clientKey);

            if (!deletedTokens) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: deletedTokens,
            });
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: IRequest, res: IResponse<ITokensPair>, next: NextFunction): Promise<IResponse<ITokensPair> | undefined> {
        try {
            const requestClientKey = req.clientKey as string;
            const payload = req.payload as IPayload;
            const newTokens = await authService.refresh(payload, requestClientKey);

            if (!newTokens) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            const { refresh, access, clientKey } = newTokens;

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: {
                    refresh,
                    access,
                    clientKey,
                },
            });
        } catch (e) {
            next(e);
        }
    }

    public async forgotPassword(req: IRequest, res: IResponse<string>, next: NextFunction): Promise<IResponse<string> | undefined> {
        try {
            const { nickName, id, role } = req.user as Users;

            const forgotGeneratedAndSaved = await authService.forgotPassword({ id, nickName, role });

            if (!forgotGeneratedAndSaved) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            const { forgot, clientKey } = forgotGeneratedAndSaved as IForgotToken;

            console.log(forgot, clientKey);

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: emailMessagesConstant[MessagesEnum.AFTER_SENT_MESSAGE_ON_EMAIL],
            });
        } catch (e) {
            next(e);
        }
    }

    public async changePassword(req: IRequest, res: IResponse<string>, next: NextFunction): Promise<IResponse<string> | undefined> {
        try {
            const password = req.password as string;
            const payload = req.payload as IPayload;
            const id = payload as number;

            const changePassword = userService.changePassword(id, password);

            if (!changePassword) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            return res.status(HttpStatusEnum.OK)
                .json({
                    status: HttpStatusEnum.OK,
                    message: HttpMessageEnum.OK,
                    data: emailMessagesConstant[MessagesEnum.CHANGE_PASSWORD],
                });
        } catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
