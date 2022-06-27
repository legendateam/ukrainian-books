import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    synchronize: true,
    logging: false,
    migrations: [
        './src/migrations/**/*.ts',
    ],
    subscribers: [],
    entities: [User],
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
