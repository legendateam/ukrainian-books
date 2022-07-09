import { Request } from 'express';

import { IAlreadyRead } from '../already-read.interface';
import { IAuthor } from '../author.interface';
import { IBook } from '../book.interface';
import { IComment } from '../comment.interface';
import { IFavorite } from '../favorite.interface';
import { IGenre } from '../genre.interface';
import { ILogin } from '../login.interface';
import { IRating } from '../rating.interface';
import { IUser } from '../user.interface';
import { IWillRead } from '../will-read.interface';
import { Users } from '../../entities';
import { IPayload } from '../payload.interface';
import { IClientKey } from '../client-key.interface';

export interface IRequest extends Request{
    alreadyReadBook?: IAlreadyRead,
    author?: IAuthor,
    book?: IBook,
    comment?: IComment,
    favorite?: IFavorite,
    genre?: IGenre,
    rating?: IRating,
    user?: IUser | Users,
    willRead?: IWillRead,
    login?: ILogin,
    clientKey?: string | IClientKey,
    authorization?: string,
    email?: string,
    payload?: IPayload;
    password?: string;
}
