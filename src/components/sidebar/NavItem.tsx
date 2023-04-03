import React from 'react';
import classNames from 'classnames';
import {NavLink} from 'react-router-dom';
import {INavItemProps} from './types';
import styles from './styles.module.scss';

export const NavItem = ({isActive, path, text, icon}: INavItemProps) => {
    return (
        <NavLink to={path} className={isActive ? classNames(styles.navItem, styles.navItemActive) : styles.navItem}>
            {icon}
            <span
                className={isActive ? classNames(styles.navItemText, styles.navItemTextActive) : styles.navItemText}>{text}</span>
        </NavLink>
    );
};
