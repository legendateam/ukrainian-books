import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import css from './AuthForm.module.css';
import type { Span } from '../types';
import { authFormValidator } from '../utils';
import {
    fileMimetypeConstant, fileSizeConstant, errorFormatConstant, errorSizeConstant,
} from '../constants';
import { FileEnum } from '../enums';
import { IToggle, IUserCreate } from '../interfaces';

export const AuthForm: FC<IToggle> = ({ toggle }: IToggle) => {
    const [avatarName, setAvatarName] = useState('');
    const [error, setError] = useState('');

    const {
        register, watch, handleSubmit, formState: { errors },
    } = useForm<IUserCreate>(
        { resolver: joiResolver(authFormValidator), mode: 'onTouched' },
    );

    const errorsMessagesValidators = errors as Span;

    const submit = (data: IUserCreate): void => {
        if (fileSizeConstant.SIZE_AVATAR < data?.avatar[0].size
            || !fileMimetypeConstant[FileEnum.PHOTOS].includes(data?.avatar[0].type)) {
            setError(errorFormatConstant() + errorSizeConstant());
            console.log(errorFormatConstant(), errorSizeConstant());
        }

        const userOfForm = Object.assign(data);
        delete userOfForm.confirmPassword;
    };

    const mimetype = fileMimetypeConstant[FileEnum.PHOTOS].join();

    watch((value) => {
        if (value.avatar[0]) {
            setAvatarName(value.avatar[0].name);
        }
    });

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
                            Object.keys(errors).includes('nickName') ? css.header__auth_form_label_input_error_bg
                                : css.header__auth_form_label_input_bg
                        }
                        type='text'
                        defaultValue=''
                        {...register('nickName')}
                    />
                    {
                        errors.nickName && (<WarningAmberIcon className={css.header__auth_form_warning_amber_icon} />)
                    }
                </label>

                <label htmlFor='email' className={css.header__auth_form_label}>
                    Електронна пошта: { errors && (
                        <span className={css.header__auth_form_span_error_message}>
                            { errorsMessagesValidators?.email?.message }
                        </span>
                    ) }
                    <input
                        className={
                            Object.keys(errors).includes('email') ? css.header__auth_form_label_input_error_bg
                                : css.header__auth_form_label_input_bg
                        }
                        type='email'
                        defaultValue=''
                        {...register('email')}
                    />
                    {
                        errors.email && (<WarningAmberIcon className={css.header__auth_form_warning_amber_icon} />)
                    }
                </label>

                <label htmlFor='password' className={css.header__auth_form_label}>
                    Пароль: { errors && (
                        <span className={css.header__auth_form_span_error_message}>
                            { errorsMessagesValidators?.password?.message }
                        </span>
                    ) }
                    <input
                        className={
                            Object.keys(errors).includes('password') ? css.header__auth_form_label_input_error_bg
                                : css.header__auth_form_label_input_bg
                        }
                        type='password'
                        defaultValue=''
                        {...register('password')}
                    />
                    {
                        errors.password && (<WarningAmberIcon className={css.header__auth_form_warning_amber_icon} />)
                    }
                </label>

                <label htmlFor='confirmPassword' className={css.header__auth_form_label}>
                    Підтвердіть пароль: { errors && (
                        <span className={css.header__auth_form_span_error_message}>
                            { errorsMessagesValidators?.confirmPassword?.message }
                        </span>
                    ) }
                    <input
                        className={
                            Object.keys(errors).includes('confirmPassword') ? css.header__auth_form_label_input_error_bg
                                : css.header__auth_form_label_input_bg
                        }
                        type='password'
                        defaultValue=''
                        {...register('confirmPassword')}
                    />
                    {
                        errors.confirmPassword && (<WarningAmberIcon className={css.header__auth_form_warning_amber_icon} />)
                    }
                </label>

                <label htmlFor='avatar' className={css.header__auth_form_label_avatar}>
                    Аватар: { avatarName ? <span>{avatarName}</span> : <span>не вибраний</span>}
                    { errors && (
                        <span className={css.header__auth_form_span_error_message}>
                            { errorsMessagesValidators.avatar?.message }
                        </span>
                    ) }
                    <IconButton color='inherit' aria-label='upload picture' component='label'>
                        <input
                            className={
                                Object.keys(errors).includes('avatar') ? css.header__auth_form_label_input_error_bg
                                    : css.header__auth_form_label_input_bg
                            }
                            hidden
                            accept={mimetype}
                            type='file'
                            {...register('avatar')}
                        />
                        <PhotoCamera />
                    </IconButton>
                    { !avatarName && <span className={css.header__auth_form_not_required}> (не обов`язково)</span> }
                    {
                        errors.avatar && (<WarningAmberIcon className={css.header__auth_form_warning_amber_icon} />)
                    }
                </label>

                <Button type='submit' variant='contained' color='success'>
                    Зареєструватися
                </Button>
            </form>
            <CloseIcon className={css.header__auth_form_close_icon} onClick={toggle} />
        </div>
    );
};
