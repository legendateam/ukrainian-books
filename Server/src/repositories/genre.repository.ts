import { AppDataSource } from '../configs';
import { Genres } from '../entities';
import { IGenre } from '../interfaces';

class GenreRepository {
    genreRepository;

    constructor() {
        this.genreRepository = AppDataSource.getRepository(Genres);
    }

    public async createOne(genre: IGenre): Promise<Genres> {
        return this.genreRepository.save(genre);
    }

    public async getOneByEmailOrNickName(): Promise<Genres[] | null> {
        return this.genreRepository.find();
    }
}

export const genreRepository = new GenreRepository();
