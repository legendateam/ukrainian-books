import { AppDataSource } from '../ormconfig';

import { Authors } from '../entities';
import { IAuthor } from '../interfaces';

class AuthorRepository {
    authorRepository;

    constructor() {
        this.authorRepository = AppDataSource.getRepository(Authors);
    }

    public async createOne(author: IAuthor): Promise<Authors> {
        return this.authorRepository.save(author);
    }

    public async getOneByEmailOrNickName(): Promise<Authors[] | null> {
        return this.authorRepository.find();
    }
}

export const authorRepository = new AuthorRepository();
