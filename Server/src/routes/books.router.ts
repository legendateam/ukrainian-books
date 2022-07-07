import { Router } from 'express';

import { booksController } from '../controllers';

export const booksRouter = Router();

booksRouter.get('/', booksController.getAll);
booksRouter.post('/', booksController.createOne);
