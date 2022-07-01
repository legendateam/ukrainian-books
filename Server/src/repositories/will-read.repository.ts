import { AppDataSource } from '../ormconfig';

import { WillRead } from '../entities';
import { IWillRead } from '../interfaces/will-read.interface';

class WillReadRepository {
    willReadRepository;

    constructor() {
        this.willReadRepository = AppDataSource.getRepository(WillRead);
    }

    public async createOne(genre: IWillRead): Promise<IWillRead> {
        return this.willReadRepository.save(genre);
    }

    public async getOneByEmailOrNickName(): Promise<IWillRead[] | null> {
        return this.willReadRepository.find();
    }
}

export const willReadRepository = new WillReadRepository();
