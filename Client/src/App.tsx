import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Layout } from './components';
import { HomePage } from './pages';

const App = () => (
    <div>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
            </Route>
        </Routes>
    </div>
);

export default App;
