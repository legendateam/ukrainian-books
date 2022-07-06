import { createClient } from 'redis';

class ClientService {
    client;

    constructor() {
        this.client = createClient();
        (async () => {
            await this.client.connect();
        })();
    }

    public async get(data: string): Promise<string | null> {
        return this.client.get(data);
    }

    public async set(key: string, data: string): Promise<string | null> {
        return this.client.set(key, data);
    }
}
export const clientService = new ClientService();
