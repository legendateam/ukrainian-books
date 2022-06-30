import dotenv from 'dotenv';

dotenv.config();

export const mainConfig = {
    PORT: process.env.PORT || 2000,
    NAME_DATABASE: process.env.NAME_DATABASE || 'root',
    USER_NAME_DATABASE: process.env.USER_NAME_DATABASE || 'root',
    HOST_DATABASE: process.env.HOST_DATABASE || 'localhost',
    PORT_DATABASE: process.env.PORT_DATABASE || 5432,
    PASSWORD_DATABASE: process.env.PASSWORD_DATABASE || 'root',
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
