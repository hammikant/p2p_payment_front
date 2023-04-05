import React from 'react';
import styles from './styles.module.scss';

export const TableHead = ({name}: { name: string; }) => {
    return (
        <div className={styles.item}>
            <span className={styles.itemHead}>{name}</span>
        </div>
    );
};
