import { NextFunction } from 'express';

import { IRequest, IResponse } from '../interfaces';
import { userRepository } from '../repositories';
import { bcryptService, clientService, jwtService } from '../services';
import { ErrorHandler } from '../error';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';

class AuthController {
    public async login(req: IRequest, res: IResponse<any>, next: NextFunction): Promise<IResponse<any> | undefined> {
        try {
            const { email, password } = req.body;

            const user = await userRepository.getOneByEmailOrNickName({ email });

            if (!user) {
                next(new ErrorHandler('User not exist, please registration', HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
            }

            // @ts-ignore
            const checkedPassword = await bcryptService.compare(password, user.password);

            if (!checkedPassword) {
                next(new ErrorHandler(
                    'email or password is invalid',
                    HttpStatusEnum.UNAUTHORIZED,
                    HttpMessageEnum.UNAUTHORIZED,
                ));
            }

            const access = jwtService.sign({ id: user?.id, nickName: user?.nickName, role: user?.role });
            const refresh = jwtService.sign({ id: user?.id, nickName: user?.nickName, role: user?.role }, 'refresh');

            await clientService.set(`${user?.nickName}`, JSON.stringify({ access, refresh }));
            const userTokens = await clientService.get(`${user?.nickName}`) as string;
            const { access: redisAccess, refresh: redisRefresh } = JSON.parse(userTokens);
            console.log(redisAccess, redisRefresh);

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: {
                    access: redisAccess,
                    refresh: redisRefresh,
                },
            });
        } catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
