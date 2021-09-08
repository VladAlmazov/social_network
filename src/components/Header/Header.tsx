import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';

export type HeaderPropsType = {
    isAuth: boolean
    login: string
    logout: () => void
}

const Header = (props: HeaderPropsType) => {
    return <header className={s.header}>
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;