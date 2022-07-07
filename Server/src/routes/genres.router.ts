import { Router } from 'express';

import { genresController } from '../controllers';

export const genresRouter = Router();

genresRouter.post('/', genresController.createOne);
genresRouter.get('/:id', genresController.getOne);
