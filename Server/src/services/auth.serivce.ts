// import { TokensEnum } from '../enums';

import { IUser } from '../interfaces';
import { Users } from '../entities';
import { userRepository } from '../repositories';

class AuthService {
    public async registration(user: IUser): Promise<Users> {
        return userRepository.createOne(user);
    }
    //
    // public async login() {
    //
    // }
    //
    // private async generateNewTokens(access?: TokensEnum.ACCESS, resresh?: TokensEnum.REFRESH, forgot?: TokensEnum.FORGOT) {
    //
    // }
}
export const authService = new AuthService();
