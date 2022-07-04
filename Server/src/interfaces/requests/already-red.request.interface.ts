import { Request } from 'express';

import { IAlreadyRead } from '../already-read.interface';

export interface IRequestAlreadyRead extends Request{
    alreadyReadBook?: IAlreadyRead;
}
