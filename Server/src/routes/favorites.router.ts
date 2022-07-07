import { Router } from 'express';

import { favoritesController } from '../controllers';

export const favoritesRouter = Router();

favoritesRouter.post('/', favoritesController.createOne);
