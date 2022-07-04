import { Request } from 'express';

import { IFavorite } from '../favorite.interface';

export interface IRequestFavorites extends Request{
    favorite: IFavorite
}
