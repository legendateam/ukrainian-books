import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import css from './Auth.module.css';

const Auth:FC = () => (
    <div className={css.header__auth}>
        <Link to='#'>Реєстрація</Link>
        <p>/</p>
        <Link to='#'>Логінація</Link>
    </div>
);

export default Auth;
