import { Router } from 'express';

import { booksController } from '../controllers';

export const booksRouter = Router();

booksRouter.post('/', booksController.createOne);
