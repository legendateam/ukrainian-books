import { AppDataSource } from '../ormconfig';

import { Genres } from '../entities';
import { IGenre } from '../interfaces/genre.interface';

class GenreRepository {
    genreRepository;

    constructor() {
        this.genreRepository = AppDataSource.getRepository(Genres);
    }

    public async createOne(genre: IGenre): Promise<IGenre> {
        return this.genreRepository.save(genre);
    }

    public async getOneByEmailOrNickName(): Promise<IGenre[] | null> {
        return this.genreRepository.find();
    }
}

export const genreRepository = new GenreRepository();
