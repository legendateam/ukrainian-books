import { IUser } from '../user.interface';

export interface IRequestUser extends Request{
    user: IUser;
}
