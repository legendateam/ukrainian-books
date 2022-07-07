import { Router } from 'express';

import { authorsController } from '../controllers';

export const authorsRouter = Router();

authorsRouter.post('/', authorsController.createOne);
