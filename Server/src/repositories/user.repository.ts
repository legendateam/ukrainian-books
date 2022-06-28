import { AppDataSource } from '../ormconfig';
import { User } from '../entities/user.entity';

class UserRepository {
    userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    public async createOne(user: User): Promise<User> {
        return this.userRepository.create(user);
    }
}

export const userRepository = new UserRepository();
