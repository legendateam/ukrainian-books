import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { mainConfig } from './configs';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: mainConfig.HOST_DATABASE,
    port: Number(mainConfig.PORT_DATABASE),
    username: mainConfig.USER_NAME_DATABASE,
    password: mainConfig.PASSWORD_DATABASE,
    database: mainConfig.NAME_DATABASE,
    synchronize: false,
    logging: false,
    migrations: [
        './src/migrations/**/*.ts',
    ],
    subscribers: [],
    entities: [
        './src/entities/**/*.entity.ts',
    ],
});
