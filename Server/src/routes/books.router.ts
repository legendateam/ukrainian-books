import { Router } from 'express';

import { booksController } from '../controllers';

export const booksRouter = Router();

// @ts-ignore
booksRouter.post('/', booksController.createOne);
