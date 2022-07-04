import { Router } from 'express';

import { willReadController } from '../controllers';

export const willReadRouter = Router();
// @ts-ignore
willReadRouter.post('/', willReadController.createOne);
