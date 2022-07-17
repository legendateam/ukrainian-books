import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import css from './Genres.module.css';
import Genre from '../Genre/Genre';

const Genres:FC = () => (
    <div className={css.header__nav_genres}>
        <PopupState variant='popover' popupId='demo-popup-popover'>
            {(popupState) => (
                <div>
                    <Button variant='text' color='inherit' {...bindTrigger(popupState)}>
                        Жанри
                    </Button>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 3 }}>
                            <ul className={css.header__nav_genres_typography}>
                                <li><Genre /></li>
                                <li><Genre /></li>
                                <li><Genre /></li>
                                <li><Genre /></li>
                                <li><Genre /></li>
                                <li><Genre /></li>
                                <li><Genre /></li>
                                <li><Genre /></li>
                                <li><Genre /></li>
                                <li><Genre /></li>
                                <li><Genre /></li>
                            </ul>
                        </Typography>
                    </Popover>
                </div>
            )}
        </PopupState>
    </div>
);

export default Genres;
