import { AppDataSource } from '../ormconfig';

import { Books } from '../entities';
import { IBook } from '../interfaces';

class BookRepository {
    bookRepository;

    constructor() {
        this.bookRepository = AppDataSource.getRepository(Books);
    }

    public async createOne(book: IBook): Promise<Books> {
        return this.bookRepository.save(book);
    }

    public async getOneByEmailOrNickName(): Promise<Books[] | null> {
        return this.bookRepository.find();
    }
}

export const bookRepository = new BookRepository();
