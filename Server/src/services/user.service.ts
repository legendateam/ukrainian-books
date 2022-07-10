import { userRepository } from '../repositories';
import { IEmailRequest, IUniqueUserField } from '../interfaces';
import { Users } from '../entities';

export class UserService {
    public async getOneByEmailOrNickName(data: IUniqueUserField): Promise<Users | null> {
        return userRepository.getOneByEmailOrNickName(data);
    }

    public async getOneByEmail({ email }: IEmailRequest): Promise<Users | null> {
        return userRepository.getOneByEmail(email);
    }

    public async getOneById(id: number): Promise<Users | null> {
        return userRepository.getOneById(id);
    }
}

export const userService = new UserService();
