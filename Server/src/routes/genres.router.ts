import { Router } from 'express';

import { genresController } from '../controllers';

export const genresRouter = Router();

genresRouter.get('/', genresController.getAll);
genresRouter.post('/', genresController.createOne);
genresRouter.get('/:id', genresController.getOne);
