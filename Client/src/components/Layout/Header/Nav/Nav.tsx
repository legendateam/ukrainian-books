import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.module.css';
import Genres from './Genres/Genres';

const Nav = () => (
    <nav>
        <ul>
            <li><Genres /></li>
            <li><NavLink to='/#'>Популярні</NavLink></li>
            <li><NavLink to='/#'>Новинки</NavLink></li>
            <li><NavLink to='/#'>Автори</NavLink></li>
        </ul>
    </nav>
);

export default Nav;
