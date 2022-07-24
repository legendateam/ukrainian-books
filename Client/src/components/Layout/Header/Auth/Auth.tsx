import React, { FC } from 'react';

import css from './Auth.module.css';
import Registration from './Registration/Registration';
import Login from './Login/Login';

const Auth:FC = () => (
    <div className={css.header__auth}>
        <Login />
        <span>/</span>
        <Registration />
    </div>
);

export default Auth;
