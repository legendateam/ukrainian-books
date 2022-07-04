import { Router } from 'express';

import { authorsController } from '../controllers';

export const authorsRouter = Router();

// @ts-ignore
authorsRouter.post('/', authorsController.createOne);
