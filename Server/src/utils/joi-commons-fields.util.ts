import Joi from 'joi';

export const joiCommonsFieldsUtil = {
    email: Joi.string()
        .email()
        .min(5)
        .max(25)
        .lowercase()
        .trim(),
    password: Joi.string()
        .min(7)
        .max(40)
        .trim(),
    token: Joi.string()
        .token()
        .min(10),
    clientKey: Joi.string(),
};
