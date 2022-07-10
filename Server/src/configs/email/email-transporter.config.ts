import nodemailer from 'nodemailer';

import { mainConfig } from '../main.config';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mainConfig.ROOT_EMAIL,
        pass: mainConfig.NO_REPLY_EMAIL_PASSWORD,
    },
});
