import { NextFunction } from 'express';

import {IFavorite, IRequest, IResponse} from '../interfaces';
import { Favorites } from '../entities';
import { favoritesRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';

class FavoritesController {
    public async createOne(req: IRequest, res: IResponse<Favorites>, next: NextFunction)
        : Promise<IResponse<Favorites> | undefined> {
        try {
            const favorite = req.favorite as IFavorite;
            const favoriteCreated = await favoritesRepository.createOne(favorite);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: favoriteCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const favoritesController = new FavoritesController();
