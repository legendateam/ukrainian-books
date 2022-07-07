import { Router } from 'express';

import { ratingsController } from '../controllers';

export const ratingsRouter = Router();

ratingsRouter.post('/', ratingsController.createOne);
