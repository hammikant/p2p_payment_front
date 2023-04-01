import React from 'react';
import {IButton} from './types';
import styles from './styles.module.scss';

export const Button = ({text, ...props}: IButton) => {
    return (
        <button {...props} className={styles.button}>{text}</button>
    );
};
