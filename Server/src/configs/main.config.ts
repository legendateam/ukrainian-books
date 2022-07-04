import dotenv from 'dotenv';

dotenv.config();

export const mainConfig = {
    PORT: process.env.PORT || 2000,
    PG_NAME_DATABASE: process.env.PG_NAME_DATABASE || 'root',
    PG_USER_NAME_DATABASE: process.env.PG_USER_NAME_DATABASE || 'root',
    PG_HOST_DATABASE: process.env.PG_HOST_DATABASE || 'localhost',
    PG_PORT_DATABASE: process.env.PG_PORT_DATABASE || 5432,
    PG_PASSWORD_DATABASE: process.env.PG_PASSWORD_DATABASE || 'root',
    DOMAIN_NAME: process.env.DOMAIN_NAME || 'https://my-library.ua/',
    PASSWORD_SALT_ROUNDS: process.env.PASSWORD_SALT_ROUNDS || 7,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'secret_access',
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 'secret_refresh',
    SECRET_FORGOT_PASSWORD_KEY: process.env.SECRET_FORGOT_PASSWORD_KEY || 'secret_forgot',
    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS || '1h',
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH || '8h',
    EXPIRES_IN_FORGOT_PASSWORD: process.env.EXPIRES_IN_FORGOT_PASSWORD || '30m',
    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD,
    S3_NAME: process.env.S3_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
};
