import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import css from './Genre.module.css';
import { IGenreProps } from '../../../../../interfaces';

const Genre:FC<IGenreProps> = ({ genre: { name } }:IGenreProps) => (
    <div className={css.header__nav_genres_typography}>
        <Link to={name}>
            <button className={css.header__nav_genre} type='button'>{name}</button>
        </Link>
    </div>
);

export default Genre;
