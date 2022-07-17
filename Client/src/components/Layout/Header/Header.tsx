import React, { FC } from 'react';

import css from './Header.module.css';
import Logo from './Logo/Logo';
import Auth from './Auth/Auth';
import Search from './Search/Search';
import Nav from './Nav/Nav';

const Header: FC = () => (
    <header>
        <div className={css.header__container}>
            <Logo />
            <div className={css.header__container_nav}>
                <Search />
                <Nav />
            </div>
            <Auth />
        </div>
    </header>
);

export default Header;
