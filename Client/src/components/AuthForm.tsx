import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import css from './AuthForm.module.css';
import type { Span } from '../types';
import { authFormValidator } from '../utils';
import { fileMimetypeConstant } from '../constants';
import { FileEnum } from '../enums';

export const AuthForm: FC = () => {
    const [errorInput, setErrorInput] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm(
        { resolver: joiResolver(authFormValidator), mode: 'onTouched' },
    );

    const errorsMessagesValidators = errors as Span;

    const submit = (data: any) => {
        console.log(data);
        console.log(errors);
    };

    const mimetype = fileMimetypeConstant[FileEnum.PHOTOS].join();

    useEffect(() => {
        if (Object.keys(errors).length !== 0) {
            const keysInputs = Object.keys(errors);
            setErrorInput(keysInputs);
        }
    }, [Object.keys(errors).length]);

    return (
        <div className={css.header__auth_form}>
            <form onSubmit={handleSubmit(submit)}>
                <label htmlFor='nickName' className={css.header__auth_form_label}>
                    Ваш псевдонім: { errors && (
                        <span className={css.header__auth_form_span_error_message}>
                            { errorsMessagesValidators?.nickName?.message }
                        </span>
                    ) }
                    <input
                        className={
                            (!errorInput.includes('nickName') && css.header__auth_form_label_input_bg)
                            || (errorInput.includes('nickName') && css.header__auth_form_label_input_error_bg)
                        }
                        type='text'
                        defaultValue=''
                        {...register('nickName')}
                    />
                </label>

                <label htmlFor='email' className={css.header__auth_form_label}>
                    Електронна пошта: { errors && (
                        <span className={css.header__auth_form_span_error_message}>
                            { errorsMessagesValidators?.email?.message }
                        </span>
                    ) }
                    <input
                        className={
                            (!errorInput.includes('email') && css.header__auth_form_label_input_bg)
                            || (errorInput.includes('email') && css.header__auth_form_label_input_error_bg)
                        }
                        type='email'
                        defaultValue=''
                        {...register('email')}
                    />
                </label>

                <label htmlFor='password' className={css.header__auth_form_label}>
                    Пароль: { errors && (
                        <span className={css.header__auth_form_span_error_message}>
                            { errorsMessagesValidators?.password?.message }
                        </span>
                    ) }
                    <input
                        className={
                            (!errorInput.includes('password') && css.header__auth_form_label_input_bg)
                            || (errorInput.includes('password') && css.header__auth_form_label_input_error_bg)
                        }
                        type='password'
                        defaultValue=''
                        {...register('password')}
                    />
                </label>

                <label htmlFor='confirmPassword' className={css.header__auth_form_label}>
                    Підтвердіть пароль: { errors && (
                        <span className={css.header__auth_form_span_error_message}>
                            { errorsMessagesValidators?.confirmPassword?.message }
                        </span>
                    ) }
                    <input
                        className={
                            (!errorInput.includes('confirmPassword') && css.header__auth_form_label_input_bg)
                            || (errorInput.includes('confirmPassword') && css.header__auth_form_label_input_error_bg)
                        }
                        type='password'
                        defaultValue=''
                        {...register('confirmPassword')}
                    />
                </label>

                <label htmlFor='avatar' className={css.header__auth_form_label_avatar}>
                    Аватар: { errors && (
                        <span className={css.header__auth_form_span_error_message}>
                            { errorsMessagesValidators.avatar?.message }
                        </span>
                    ) }
                    <input
                        className={
                            (!errorInput.includes('avatar') && css.header__auth_form_label_input_bg)
                            || (errorInput.includes('avatar') && css.header__auth_form_label_input_error_bg)
                        }
                        type='file'
                        accept={mimetype}
                        {...register('avatar')}
                    />
                </label>

                <button type='submit'>Зареєструватися</button>
            </form>
        </div>
    );
};
