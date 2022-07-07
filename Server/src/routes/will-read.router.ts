import { Router } from 'express';

import { willReadController } from '../controllers';

export const willReadRouter = Router();

willReadRouter.post('/', willReadController.createOne);
