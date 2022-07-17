import React from 'react';
import { Outlet } from 'react-router-dom';

import css from './Layout.module.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';

export const Layout = () => (
    <div>
        <Header />
        <div className={css.content}>
            <Outlet />
        </div>
        <Footer />
    </div>
);
