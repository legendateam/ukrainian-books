import dotenv from 'dotenv';

dotenv.config();

export const mainConfig = {
    NODE_ENVIRONMENT_VARIABLE: process.env.NODE_ENVIRONMENT_VARIABLE || 'dev',
    BASE_URL: process.env.BASE_URL || 'http://localhost:2000',

    DOMAIN_NAME: process.env.DOMAIN_NAME || 'https://my-domain.ua',
    PROJECT_NAME: process.env.PROJECT_NAME || 'my-project',

    CLOUD_DOMAIN_NAME: process.env.CLOUD_DOMAIN_NAME,

    ROOT_EMAIL: process.env.ROOT_EMAIL,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_KEY: process.env.GOOGLE_SECRET_KEY,
};
