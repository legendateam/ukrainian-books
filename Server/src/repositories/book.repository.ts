import { AppDataSource } from '../configs';
import { Books } from '../entities';
import { IBook } from '../interfaces';

class BookRepository {
    bookRepository;

    constructor() {
        this.bookRepository = AppDataSource.getRepository(Books);
    }

    public async createOne(book: IBook): Promise<Books> {
        const id = [] as any;
        book.genres.forEach((genre) => id.push({ id: genre }));
        return this.bookRepository.save({ ...book, genres: id });
    }

    public async getOneByEmailOrNickName(): Promise<Books[] | null> {
        return this.bookRepository.find();
    }
}

export const bookRepository = new BookRepository();
