import { NextFunction } from 'express';

import { IGenre, IRequest, IResponse } from '../interfaces';
import { Genres } from '../entities';
import { genreRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';

class GenresController {
    public async createOne(req: IRequest, res: IResponse<Genres>, next: NextFunction): Promise<IResponse<Genres> | undefined> {
        try {
            const genre = req.body as IGenre;
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

    public async getOne(req: IRequest, res: IResponse<Genres>, next: NextFunction): Promise<IResponse<Genres> | undefined> {
        try {
            const { id } = req.params;
            const { limit } = req.query;

            const genre = await genreRepository.getOneById(Number(id), Number(limit)) as Genres;

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: genre,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getAll(_: IRequest, res: IResponse<Genres[]>, next: NextFunction): Promise<IResponse<Genres[]> | undefined> {
        try {
            const genres = await genreRepository.getAll();

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: genres,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const genresController = new GenresController();
