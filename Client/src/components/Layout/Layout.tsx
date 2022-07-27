import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import css from './Layout.module.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { useBlurMode } from '../../hooks';
import AuthRegistrationForm from './Header/Auth/AuthRegistrationForm/AuthRegistrationForm';

export const Layout = () => {
    const { triggerBlur } = useBlurMode();

    return (
        <Box
            className={triggerBlur ? css.blur__bg : ''}
            sx={{
                width: '100%',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Header />
            { triggerBlur && <AuthRegistrationForm /> }
            <main className={css.content}>
                <Outlet />
            </main>
            <Footer />
        </Box>
    );
};
