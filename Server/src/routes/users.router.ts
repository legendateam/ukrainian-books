import { Router } from 'express';

import { usersController } from '../controllers';
import { userMiddleware } from '../middlewares';

export const usersRouter = Router();

usersRouter.post('/', userMiddleware.validationBody, userMiddleware.checkIsAlreadyExists, usersController.createOne);
