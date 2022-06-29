import { userRepository } from '../repositories';
import { IUser } from '../interfaces/user.interface';

export class UserService {
    getOneByEmailOrNickName(data: IUser): any {
        return userRepository.getOneByEmailOrNickName(data);
    }
}

export const userService = new UserService();
