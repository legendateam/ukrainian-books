import { AppDataSource } from '../configs';
import { Likes } from '../entities';
import { ILike } from '../interfaces';

class LikeRepository {
    likeRepository;

    constructor() {
        this.likeRepository = AppDataSource.getRepository(Likes);
    }

    public async createOne(like: ILike): Promise<Likes> {
        return this.likeRepository.save(like);
    }

    public async getOneByEmailOrNickName(): Promise<Likes[] | null> {
        return this.likeRepository.find();
    }
}

export const likeRepository = new LikeRepository();
