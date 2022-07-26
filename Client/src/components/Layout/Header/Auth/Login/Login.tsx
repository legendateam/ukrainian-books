import React, { FC, useState } from 'react';
import { AuthForm } from '../../../../AuthForm';

const Login:FC = () => {
    const [trigger, setTrigger] = useState(false);

    const toggle = () => {
        trigger ? setTrigger(false) : setTrigger(true);
    };
    return (
        <>
            <p onClick={toggle}>Увійти</p>
            { trigger && <AuthForm toggle={toggle} /> }
        </>
    );
};

export default Login;
