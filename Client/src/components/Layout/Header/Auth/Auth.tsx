import React, { FC } from 'react';
import PersonIcon from '@mui/icons-material/Person';

import css from './Auth.module.css';
import AuthForm from './AuthForm/AuthForm';
import { useBlurMode } from '../../../../hooks';
import { IHandleRegistrationForm } from '../../../../interfaces';

const Auth:FC<IHandleRegistrationForm> = ({ handleRegistration, triggerRegBtn }) => {
    const { handleBlurToggle, triggerBlur } = useBlurMode();
    return (
        <div className={css.header__auth}>
            <button onClick={handleBlurToggle} type='button'>
                <PersonIcon fontSize='large' />
                <p>ВХІД</p>
            </button>
            { (triggerBlur && !triggerRegBtn) && <AuthForm handleRegistration={handleRegistration} /> }
        </div>
    );
};

export default Auth;
