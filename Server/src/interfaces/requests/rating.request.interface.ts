import { Request } from 'express';

import { IRating } from '../rating.interface';

export interface IRequestRating extends Request{
    rating: IRating
}
