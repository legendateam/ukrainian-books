import { Request } from 'express';

import { IWillRead } from '../will-read.interface';

export interface IRequestWillRead extends Request{
    willRead: IWillRead;
}
