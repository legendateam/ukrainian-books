import { AppDataSource } from '../configs';
import { Users } from '../entities';
import { IUser } from '../interfaces';

class UserRepository {
    userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(Users);
    }

    public async createOne(user: IUser): Promise<Users> {
        return this.userRepository.save(user);
    }

    public async getOneByEmailOrNickName({ email }: any): Promise<Users | null> {
        return this.userRepository.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }
}

export const userRepository = new UserRepository();
