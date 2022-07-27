import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './components';
import { HomePage } from './pages';
import { BlurModeProvider, ColorModeProvider } from './hoc';

const App = () => (
    <ColorModeProvider>
        <BlurModeProvider>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                </Route>
            </Routes>
        </BlurModeProvider>
    </ColorModeProvider>
);

export default App;
