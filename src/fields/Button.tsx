import React from 'react';
import {IButton} from './types';
import styles from './styles.module.scss';

export const Button = ({text, variant, icon, iconPosition, ...props}: IButton) => {
    return (
        <button {...props}

                className={
                    variant === 'full' ? styles.button : styles.outlineButton
                }
        >
            {iconPosition === 'left' && icon ? icon : null}
            {text}
            {iconPosition === 'right' && icon ? icon : null}
        </button>
    );
};
