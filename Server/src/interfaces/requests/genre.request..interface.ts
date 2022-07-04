import { Request } from 'express';

import { IGenre } from '../genre.interface';

export interface IRequestGenre extends Request{
    genre: IGenre;
}
