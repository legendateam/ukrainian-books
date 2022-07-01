import { AppDataSource } from '../ormconfig';

import { Books } from '../entities';
import { IBook } from '../interfaces/book.interface';

class BookRepository {
    bookRepository;

    constructor() {
        this.bookRepository = AppDataSource.getRepository(Books);
    }

    public async createOne(book: IBook): Promise<IBook> {
        return this.bookRepository.save(book);
    }

    public async getOneByEmailOrNickName(): Promise<IBook[] | null> {
        return this.bookRepository.find();
    }
}

export const bookRepository = new BookRepository();
