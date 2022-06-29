import { AppDataSource } from '../ormconfig';
import { User } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';

class UserRepository {
    userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    public async createOne(user: IUser): Promise<User> {
        return this.userRepository.save(user);
    }

    public async getOneByEmailOrNickName({ email, nickName }: IUser): Promise<User | null> {
        return this.userRepository.findOne({
            where: [
                { email },
                { nickName },
            ],
        });
    }
}

export const userRepository = new UserRepository();
