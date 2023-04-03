import React from 'react';
import styles from './styles.module.scss';

export const Title = ({text}: { text: string }) => {
    return (
        <h1 className={styles.title}>
            {text}
        </h1>
    );
};
