import { NextFunction } from 'express';

import { IGenre, IRequestGenre, IResponse } from '../interfaces';
import { Genres } from '../entities';
import { genreRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';

class GenresController {
    public async createOne(req: IRequestGenre, res: IResponse<Genres>, next: NextFunction): Promise<IResponse<Genres> | undefined> {
        try {
            const genre = req.genre as IGenre;
            const genreCreated = await genreRepository.createOne(genre);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: genreCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const genresController = new GenresController();
