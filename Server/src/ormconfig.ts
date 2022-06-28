import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
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
