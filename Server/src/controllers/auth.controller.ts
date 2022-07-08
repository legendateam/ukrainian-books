import { NextFunction } from 'express';

import { IRequest, IResponse, IUser } from '../interfaces';
import { authService, clientService, jwtService } from '../services';
import { HttpMessageEnum, HttpStatusEnum, TokensEnum } from '../enums';
import { Users } from '../entities';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';

class AuthController {
    public async login(req: IRequest, res: IResponse<string[]>, next: NextFunction): Promise<IResponse<string[]> | undefined> {
        try {
            const { role, id, nickName } = req.user as Users;
            const clientKey = req.clientKey as string;

            const access = jwtService.sign({ id, nickName, role });
            const refresh = jwtService.sign({ id, nickName, role }, TokensEnum.REFRESH);

            const savingResult = await clientService.set(clientKey, JSON.stringify({ access, refresh }));

            if (!savingResult) {
                next(new ErrorHandler(errorMessageConstant.unknown, HttpStatusEnum.NOT_IMPLEMENTED, HttpMessageEnum.NOT_IMPLEMENTED));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: [
                    access,
                    refresh,
                ],
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

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: userDB,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
