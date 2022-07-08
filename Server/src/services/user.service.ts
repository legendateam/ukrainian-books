import { userRepository } from '../repositories';
import { IUser } from '../interfaces';
import { Users } from '../entities';

export class UserService {
    public async getOneByEmailOrNickName(data: IUser): Promise<Users | null> {
        return userRepository.getOneByEmailOrNickName(data);
    }

    public async getOneByEmail(email: string): Promise<Users | null> {
        return userRepository.getOneByEmail(email);
    }
}

export const userService = new UserService();
