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

    public async getAnyKeysByNickName(nickName: string, type: ClientKeyEnum): Promise<string[]> {
        return this.client.keys(`*${type}:${nickName}*`);
    }

    public async getKey(key: string): Promise<string[]> {
        return this.client.keys(key);
    }

    public generateKey(nickName: string, type: ClientKeyEnum, numberKey = 1) {
        if (numberKey > 1) {
            this._incrementNumberKey(numberKey);
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

    private _incrementNumberKey(numberKey: number): number {
        return numberKey + 1;
    }
}
export const clientService = new ClientService();
