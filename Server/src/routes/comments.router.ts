import { Router } from 'express';

import { commentsController } from '../controllers';

export const commentsRouter = Router();

// @ts-ignore
commentsRouter.post('/', commentsController.createOne);
