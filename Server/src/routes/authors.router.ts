import { Router } from 'express';

import { authorsController } from '../controllers';

export const authorsRouter = Router();

authorsRouter.get('/', authorsController.getAll);
authorsRouter.post('/', authorsController.createOne);
