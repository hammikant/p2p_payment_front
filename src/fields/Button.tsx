import React from 'react';
import {IButton} from './types';
import styles from './styles.module.scss';

export const Button = ({text, variant, ...props}: IButton) => {
    return (
        <button {...props}
                className={
                    variant === 'full' ? styles.button : styles.outlineButton
                }
        >{text}</button>
    );
};
