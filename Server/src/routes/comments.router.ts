import { Router } from 'express';

import { commentsController } from '../controllers';

export const commentsRouter = Router();

commentsRouter.post('/', commentsController.createOne);
