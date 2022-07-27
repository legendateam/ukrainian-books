import React, { FC } from 'react';

import css from './Login.module.css';
import { useBlurMode } from '../../../../../hooks';
import AuthRegistrationForm from '../AuthRegistrationForm/AuthRegistrationForm';

const Login:FC = () => {
    const { handleBlurToggle, triggerBlur } = useBlurMode();

    return (
        <>
            <button className={css.header__auth_login_btn} onClick={handleBlurToggle} type='button'><p>Увійти</p></button>
            { triggerBlur && <AuthRegistrationForm /> }
        </>
    );
};

export default Login;
