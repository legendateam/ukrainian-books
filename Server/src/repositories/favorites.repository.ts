import { AppDataSource } from '../ormconfig';

import { IFavorite } from '../interfaces/favorite.interface';
import { Favorites } from '../entities';

class FavoritesRepository {
    favoritesRepository;

    constructor() {
        this.favoritesRepository = AppDataSource.getRepository(Favorites);
    }

    public async createOne(favorite: IFavorite): Promise<IFavorite> {
        return this.favoritesRepository.save(favorite);
    }

    public async getOneByEmailOrNickName(): Promise<IFavorite[] | null> {
        return this.favoritesRepository.find();
    }
}

export const favoritesRepository = new FavoritesRepository();
