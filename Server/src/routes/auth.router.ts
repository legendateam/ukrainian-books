import { Router } from 'express';

import { authController } from '../controllers';
import { authMiddleware } from '../middlewares';
import { apiRouter } from './api.router';

export const authRouter = Router();

authRouter.post(
    '/registration',
    authMiddleware.validateBodyRegistration,
    authMiddleware.checkIsAlreadyExists,
    authController.registration,
);
authRouter.post(
    '/login',
    authMiddleware.validateBodyLogin,
    authMiddleware.checkUserIsAuth,
    authMiddleware.checkPassword,
    authMiddleware.checkClientExistsKeys,
    authController.login,
);
apiRouter.post(
    '/logout',
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
);
apiRouter.post(
    '/refresh',
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
);
apiRouter.post(
    '/forgotPassword',
    authMiddleware.validateEmail,
);
