import { NextFunction } from 'express';

import { Books } from '../entities';
import { IBook, IResponse } from '../interfaces';
import { IRequestBook } from '../interfaces';
import { bookRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';

class BooksController {
    public async createOne(req: IRequestBook, res: IResponse<Books>, next: NextFunction): Promise<IResponse<Books> | undefined> {
        try {
            const book = req.book as IBook;
            const bookCreated = await bookRepository.createOne(book);

            return res.status(HttpStatusEnum.CREATED).json({
                message: HttpMessageEnum.CREATED,
                data: bookCreated,
                status: HttpStatusEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const booksController = new BooksController();
