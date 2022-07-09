import { Router } from 'express';

import { authController } from '../controllers';
import { authMiddleware } from '../middlewares';

export const authRouter = Router();

authRouter.post(
    '/registration',
    authMiddleware.validateBodyRegistration,
    authMiddleware.checkUserOnUnique,
    authController.registration,
);

authRouter.post(
    '/login',
    authMiddleware.validateBodyLogin,
    authMiddleware.checkUserAuthByEmail,
    authMiddleware.checkPassword,
    authMiddleware.checkClientExistsKeys,
    authController.login,
);

authRouter.post(
    '/logout',
    authMiddleware.isAuthorization,
    authMiddleware.isClientKey,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.verifyAccessToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authController.logout,
);

authRouter.post(
    '/refresh',
    authMiddleware.isAuthorization,
    authMiddleware.isClientKey,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.checkAuthorizationOnBearer,
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
    authMiddleware.validateAuthorizationToken,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.verifyForgotToken,
    authMiddleware.checkUserAuthByPayload,
    authController.changePassword,
);
