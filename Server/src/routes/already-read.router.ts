import { Router } from 'express';

import { alreadyReadController } from '../controllers';

export const alreadyReadRouter = Router();

alreadyReadRouter.post('/', alreadyReadController.createOne);
