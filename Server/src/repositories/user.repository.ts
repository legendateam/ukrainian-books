import { AppDataSource } from '../ormconfig';
import { User } from '../entities/user.entity';

class UserRepository {
    user;

    constructor() {
        this.user = AppDataSource.getRepository(User);
    }

    public async createOne(user: User): Promise<User> {
        return this.user.save(user);
    }
}

export const userRepository = new UserRepository();
