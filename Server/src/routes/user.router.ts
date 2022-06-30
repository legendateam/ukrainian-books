import { Router } from 'express';

import { userController } from '../controllers';
import { userMiddleware } from '../middlewares';

export const userRouter = Router();

userRouter.post('/', userMiddleware.validationBody, userMiddleware.checkIsAlreadyExists, userController.createOne);
