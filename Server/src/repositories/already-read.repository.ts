import { AppDataSource } from '../ormconfig';

import { AlreadyRead } from '../entities';
import { IAlreadyRead } from '../interfaces/already-read.interface';

class AlreadyReadRepository {
    alreadyReadRepository;

    constructor() {
        this.alreadyReadRepository = AppDataSource.getRepository(AlreadyRead);
    }

    public async createOne(AlreadyRead: IAlreadyRead): Promise<AlreadyRead> {
        return this.alreadyReadRepository.save(AlreadyRead);
    }

    public async getOneByEmailOrNickName(): Promise<AlreadyRead[] | null> {
        return this.alreadyReadRepository.find();
    }
}

export const alreadyReadRepository = new AlreadyReadRepository();
