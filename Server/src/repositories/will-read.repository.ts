import { AppDataSource } from '../ormconfig';

import { WillRead } from '../entities';
import { IWillRead } from '../interfaces';

class WillReadRepository {
    willReadRepository;

    constructor() {
        this.willReadRepository = AppDataSource.getRepository(WillRead);
    }

    public async createOne(willRead: IWillRead): Promise<IWillRead> {
        return this.willReadRepository.save(willRead);
    }

    public async getOneByEmailOrNickName(): Promise<IWillRead[] | null> {
        return this.willReadRepository.find();
    }
}

export const willReadRepository = new WillReadRepository();
