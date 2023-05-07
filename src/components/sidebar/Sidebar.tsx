import React from 'react';
import {useLocation} from 'react-router-dom';
import {useAppSelector} from '../../hooks/app';
import {NavItem} from './NavItem';
import styles from './styles.module.scss';
import {config, configMerchant} from './config';

export const Sidebar = () => {
    const {pathname} = useLocation();
    const {role} = useAppSelector(state => state.auth);
    return (
        <div className={styles.nav}>
            {
                role === 'merchant'
                    ? configMerchant.map(item => (
                        <NavItem
                            key={item.path}
                            icon={item.icon(pathname === item.path)}
                            path={item.path}
                            text={item.name}
                            isActive={pathname === item.path}/>
                    ))
                    : config.map(item => (
                        <NavItem
                            key={item.path}
                            icon={item.icon(pathname === item.path)}
                            path={item.path}
                            text={item.name}
                            isActive={pathname === item.path}/>
                    ))
            }

        </div>
    );
};
