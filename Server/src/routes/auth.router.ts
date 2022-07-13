import { Router } from 'express';

import { authController } from '../controllers';
import { authMiddleware, userAvatar } from '../middlewares';

export const authRouter = Router();
const upload = userAvatar();

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
