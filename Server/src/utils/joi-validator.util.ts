import Joi from 'joi';

import { joiCommonValidatorsUtil } from './joi-common-validators.util';

class JoiValidatorUtil {
    public static userSchema: Joi.ObjectSchema = Joi.object({
        nickName: Joi.string().min(4).max(20).trim()
            .required()
            .messages({ 'any.only': 'Must be a valid nickName' }),
        password: joiCommonValidatorsUtil.password
            .required()
            .messages({ 'any.only': 'Must be a valid password' }),
        email: joiCommonValidatorsUtil.email
            .required()
            .messages({ 'any.only': 'Must be a valid email address' }),
        role: Joi.string().min(4).max(5).trim()
            .messages({ 'any.only': 'Must be a valid role' })
            .optional(),
        avatar: Joi.binary()
            .optional()
            .messages({ 'any.only': 'must be a valid avatar' }),
    });
}

export const { userSchema } = JoiValidatorUtil;
