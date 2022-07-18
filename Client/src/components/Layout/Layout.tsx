import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import css from './Layout.module.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';

export const Layout = () => (
    <Box
        sx={{
            width: '100%',
            bgcolor: 'background.default',
            color: 'text.primary',
        }}
    >
        <Header />
        <div className={css.content}>
            <Outlet />
        </div>
        <Footer />
    </Box>
);
