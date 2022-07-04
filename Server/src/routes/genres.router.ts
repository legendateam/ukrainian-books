import { Router } from 'express';

import { genresController } from '../controllers';

export const genresRouter = Router();
// @ts-ignore
genresRouter.post('/', genresController.createOne);
