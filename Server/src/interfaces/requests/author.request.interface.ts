import { Request } from 'express';

import { IAuthor } from '../author.interface';

export interface IRequestAuthor extends Request{
    author: IAuthor
}
