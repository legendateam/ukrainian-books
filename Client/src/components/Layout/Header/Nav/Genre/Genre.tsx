import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { IGenre } from '../../../../../interfaces';
import css from './Genre.module.css';

const Genre:FC<Partial<IGenre>> = ({ name }) => (
    <div className={css.header__nav_genres_typography}>
        <Link to={name}>
            <button className={css.header__nav_genre} type='button'>{name}</button>
        </Link>
    </div>
);

export default Genre;
