import React, { FC } from 'react';

import { IGenre } from '../../../../../interfaces';

const Genre:FC<Partial<IGenre>> = ({ name }) => (
    <>
        {name}
        <br />
    </>
);

export default Genre;
