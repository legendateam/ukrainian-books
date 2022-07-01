import { AppDataSource } from '../ormconfig';

import { Likes } from '../entities';
import { ILike } from '../interfaces/like.interface';

class LikeRepository {
    likeRepository;

    constructor() {
        this.likeRepository = AppDataSource.getRepository(Likes);
    }

    public async createOne(like: ILike): Promise<ILike> {
        return this.likeRepository.save(like);
    }

    public async getOneByEmailOrNickName(): Promise<ILike[] | null> {
        return this.likeRepository.find();
    }
}

export const likeRepository = new LikeRepository();
