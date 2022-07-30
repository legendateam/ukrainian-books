import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import css from './Layout.module.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { useBlurMode } from '../../hooks';
import AuthForm from './Header/Auth/AuthForm/AuthForm';
import RegistrationForm from './Header/Auth/RegistrationForm/RegistrationForm';

export const Layout = () => {
    const { triggerBlur } = useBlurMode();
    const [triggerRegBtn, setTriggerRegBtn] = useState(false);

    const handleRegistration = (): void => {
        triggerRegBtn ? setTriggerRegBtn(false) : setTriggerRegBtn(true);
    };

    return (
        <Box
            className={triggerBlur ? css.blur__bg : ''}
            sx={{
                width: '100%',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Header handleRegistration={handleRegistration} triggerRegBtn={triggerRegBtn} />
            { (triggerBlur && !triggerRegBtn) && <AuthForm handleRegistration={handleRegistration} /> }
            { (triggerBlur && triggerRegBtn) && <RegistrationForm handleRegistration={handleRegistration} /> }
            <main className={css.content}>
                <Outlet />
            </main>
            <Footer />
        </Box>
    );
};
