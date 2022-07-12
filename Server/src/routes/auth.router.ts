import { Router } from 'express';
import multer from 'multer';

import { authController } from '../controllers';
import { authMiddleware } from '../middlewares';
import { fileSizeConstant } from '../constants/file-size.constant';
import { errorMessageConstant, filesConstant } from '../constants';
import { FileEnum, HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../error';
import { IRequest } from '../interfaces';

export const authRouter = Router();
const upload = multer({
    limits: { fileSize: fileSizeConstant.SIZE_AVATAR },
    fileFilter(_: IRequest, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        if (!filesConstant[FileEnum.PHOTOS].includes(file.mimetype)) {
            return callback(
                new ErrorHandler(errorMessageConstant.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
            );
        }
        callback(null, true);
    },
});

authRouter.post(
    '/registration',
    upload.single('avatar'),
    authMiddleware.validateBodyRegistration,
    authMiddleware.checkUserOnUnique,
    authController.registration,
);

authRouter.post(
    '/login',
    authMiddleware.validateBodyLogin,
    authMiddleware.checkUserAuthByEmail,
    authMiddleware.checkPassword,
    authController.login,
);

authRouter.post(
    '/logout',
    authMiddleware.isAuthorization,
    authMiddleware.isClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authController.logout,
);

authRouter.post(
    '/refresh',
    authMiddleware.isAuthorization,
    authMiddleware.isClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyRefreshToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authController.refresh,
);

authRouter.post(
    '/forgotPassword',
    authMiddleware.validateEmail,
    authMiddleware.checkUserAuthByEmail,
    authMiddleware.alreadyExistsForgotToken,
    authController.forgotPassword,
);

authRouter.patch(
    '/forgotPassword',
    authMiddleware.isAuthorization,
    authMiddleware.isPassword,
    authMiddleware.isClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyForgotToken,
    authMiddleware.checkUserAuthByPayload,
    authMiddleware.isAuthClientKey,
    authController.changePassword,
);
