import { Request } from 'express';

import { ILike } from '../like.interface';

export interface IRequestLike extends Request{
    like: ILike
}
