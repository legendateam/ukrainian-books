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

    public async getOneByEmailOrNickName({ email, nickName }: IUser): Promise<Users | null> {
        return this.userRepository.findOne({
            where: [
                { email },
                { nickName },
            ],
        });
    }

    public async getAll(): Promise<Users[]> {
        return this.userRepository.createQueryBuilder('users')
            .leftJoinAndSelect('users.comments', 'comments')
            .leftJoinAndSelect('users.alreadyRead', 'alreadyRead')
            .leftJoinAndSelect('users.willRead', 'willRead')
            .leftJoinAndSelect('users.favorites', 'favorites')
            .leftJoinAndSelect('users.ratings', 'ratings')
            .getMany();
    }

    public async getOneByEmail(email: string): Promise<Users | null> {
        return this.userRepository.findOneBy({ email });
    }
}

export const userRepository = new UserRepository();
