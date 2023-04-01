import React from 'react';
import styles from './styles.module.scss';

export const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.loader}>loading ...</p>
        </div>
    );
};
