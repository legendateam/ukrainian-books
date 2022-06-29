import dotenv from 'dotenv';

dotenv.config();

export const mainConfig = {
    PORT: process.env.PORT || 2000,
};
