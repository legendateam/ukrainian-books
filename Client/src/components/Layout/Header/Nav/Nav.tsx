import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.module.css';
import Genres from './Genres/Genres';

const Nav:FC = () => (
    <nav>
        <ul>
            <li><Genres /></li>
            <li><NavLink to='/#'>ПОПУЛЯРНІ</NavLink></li>
            <li><NavLink to='/#'>НОВИНКИ</NavLink></li>
            <li><NavLink to='/#'>АВТОРИ</NavLink></li>
        </ul>
    </nav>
);

export default Nav;
