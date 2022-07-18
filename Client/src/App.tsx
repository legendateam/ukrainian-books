import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ColorModeProvider from './hoc/ColorModeProvider';
import { Layout } from './components';
import { HomePage } from './pages';

const App = () => (
    <ColorModeProvider>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
            </Route>
        </Routes>
    </ColorModeProvider>
);

export default App;
