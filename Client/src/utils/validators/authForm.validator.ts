import Joi from 'joi';
import { errorValidationMessageConstant, regexConstant } from '../../constants';

export const authFormValidator = Joi.object({
    nickName: Joi.string().min(4).max(20).trim()
        .regex(regexConstant.NICKNAME)
        .required()
        .messages(errorValidationMessageConstant),
    email: Joi.string()
        .min(5)
        .max(35)
        .lowercase()
        .trim()
        .required()
        .messages(errorValidationMessageConstant),
    password: Joi.string().min(7).max(40).trim()
        .regex(regexConstant.PASSWORD)
        .disallow(Joi.ref('nickName'))
        .required()
        .messages({
            ...errorValidationMessageConstant,
            'any.invalid': 'пароль і псевдонім не можуть бути однаковими!',
        }),
    confirmPassword: Joi.any().valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'паролі не збігаються',
        }),
    avatar: Joi.any()
        .meta({ swaggerType: 'file' })
        .optional()
        .messages(errorValidationMessageConstant),
});
