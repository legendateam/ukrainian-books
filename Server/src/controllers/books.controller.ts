import { NextFunction } from 'express';

import { Books } from '../entities';
import { IBook, IRequest, IResponse } from '../interfaces';
import { bookRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';

class BooksController {
    public async createOne(req: IRequest, res: IResponse<Books>, next: NextFunction): Promise<IResponse<Books> | undefined> {
        try {
            const book = req.body as IBook;
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

    public async getAll(_: IRequest, res: IResponse<Books[]>, next: NextFunction): Promise<IResponse<Books[]> | undefined> {
        try {
            const books = await bookRepository.getAll();
            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: books,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const booksController = new BooksController();
