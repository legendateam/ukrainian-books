import { Request, Response } from 'express';

import { userRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

class UserController {
    // eslint-disable-next-line consistent-return
    public async createOne(req: Request, res: Response): Promise<Response<User> | undefined> {
        if (req.body) {
            // @ts-ignore
            const user = req.body as User;
            const userCreated = await userRepository.createOne(user);
            // @ts-ignore
            return res.json(userCreated);
        }
    }
}

export const userController = new UserController();
