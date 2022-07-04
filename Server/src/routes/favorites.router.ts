import { Router } from 'express';

import { favoritesController } from '../controllers';

export const favoritesRouter = Router();

// @ts-ignore
favoritesRouter.post('/', favoritesController.createOne);
