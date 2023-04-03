import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import styles from './styles.module.scss';

export const AuthNavigate = () => {
    const {pathname} = useLocation();
    return (
        <div className={styles.navigation}>
            <span className={styles.navigationText}>
                {pathname === '/login' ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'}
            </span>
            <NavLink to={pathname === '/login' ? '/registration' : '/login'} className={styles.navigationLink}>
                {pathname === '/login' ? 'Регистрация' : 'Авторизация'}
            </NavLink>
        </div>
    );
};
