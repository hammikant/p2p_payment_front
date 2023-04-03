import React from 'react';
import styles from './styles.module.scss';
import {IListCardProps} from './types';

export const ListCard = ({items}: IListCardProps) => {
    return (
        <ul className={styles.listCard}>
            {items.map(item => (<li key={item.label} className={styles.listCardItem}>
                <span className={styles.listCardText}>{item.label}</span>
                <span className={styles.listCardText}>{item.value}</span>
            </li>))}
        </ul>
    );
};
