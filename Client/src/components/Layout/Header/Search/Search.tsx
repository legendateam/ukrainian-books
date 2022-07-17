import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

import css from './Search.module.css';

const Search = () => (
    <div className={css.header__form_search}>
        <div className={css.header__form_icon}>
            <SearchIcon fontSize='small' />
        </div>
        <form>
            <input type='text' placeholder={'Пошук'} />
        </form>
    </div>
);

export default Search;
