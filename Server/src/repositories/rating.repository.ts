import { AppDataSource } from '../ormconfig';

import { Ratings } from '../entities';
import { IRating } from '../interfaces/rating.interface';

class RatingRepository {
    ratingRepository;

    constructor() {
        this.ratingRepository = AppDataSource.getRepository(Ratings);
    }

    public async createOne(rating: IRating): Promise<IRating> {
        return this.ratingRepository.save(rating);
    }

    public async getOneByEmailOrNickName(): Promise<IRating[] | null> {
        return this.ratingRepository.find();
    }
}

export const ratingRepository = new RatingRepository();
