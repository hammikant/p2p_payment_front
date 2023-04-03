import React from 'react';
import {useLocation} from 'react-router-dom';
import {NavItem} from './NavItem';
import styles from './styles.module.scss';
import {config} from './config';

export const Sidebar = () => {
    const {pathname} = useLocation();
    return (
        <div className={styles.nav}>
            {config.map(item => (
                <NavItem
                    key={item.path}
                    icon={item.icon(pathname === item.path)}
                    path={item.path}
                    text={item.name}
                    isActive={pathname === item.path}/>
            ))}
        </div>
    );
};
