import { createClient } from 'redis';

import { ClientKeyEnum } from '../enums/client-key.enum';

class ClientService {
    client;

    constructor() {
        this.client = createClient();
        (async () => {
            await this.client.connect();
        })();
    }

    public async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    public async set(key: string, data: string): Promise<string | null> {
        return this.client.set(key, data);
    }

    public async delete(key: string): Promise<number> {
        return this.client.del(key);
    }

    public async getKeysByNickName(nickName: string): Promise<string[]> {
        return this.client.keys(`*${nickName}*`);
    }

    public generateKey(nickName: string, type: ClientKeyEnum, numberKey = 0) {
        if (numberKey !== 0 && numberKey > 0) {
            this.incrementNumberKey(numberKey);
        }

        if (type === ClientKeyEnum.ACTIONS_LIKES) {
            return `${ClientKeyEnum.ACTIONS_LIKES}:${nickName}:${numberKey}`;
        }

        if (type === ClientKeyEnum.FORGOT) {
            return `${ClientKeyEnum.FORGOT}:${nickName}:${numberKey}`;
        }

        if (type === ClientKeyEnum.AUTH_TOKENS) {
            return `${ClientKeyEnum.AUTH_TOKENS}:${nickName}:${numberKey}`;
        }
    }

    private incrementNumberKey(numberKey: number): number {
        return numberKey + 1;
    }
}
export const clientService = new ClientService();
