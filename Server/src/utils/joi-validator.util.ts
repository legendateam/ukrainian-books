import Joi from 'joi';

import { joiCommonsFieldsUtil } from './joi-commons-fields.util';
import { ErrorsMessagesValidationsConstant } from '../constants';

class JoiValidatorUtil {
    public static userSchema: Joi.ObjectSchema = Joi.object({
        nickName: Joi.string().min(4).max(20).trim()
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        password: joiCommonsFieldsUtil.password
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        email: joiCommonsFieldsUtil.email
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        role: Joi.string().min(4).max(5).trim()
            .messages(ErrorsMessagesValidationsConstant)
            .optional(),
        avatar: Joi.binary()
            .optional()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static loginSchema: Joi.ObjectSchema = Joi.object({
        email: joiCommonsFieldsUtil.email
            .required()
            .messages(ErrorsMessagesValidationsConstant),
        password: joiCommonsFieldsUtil.password
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });

    public static emailSchema: Joi.ObjectSchema = Joi.object({
        email: joiCommonsFieldsUtil.email
            .required()
            .messages(ErrorsMessagesValidationsConstant),
    });
}

export const { userSchema, loginSchema, emailSchema } = JoiValidatorUtil;
