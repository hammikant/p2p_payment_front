import React from 'react';
import {IDeposit} from '../store/types';
import styles from './styles.module.scss';

export const TableItem = ({item}: { item: IDeposit }) => {
    return (
        <div className={styles.tableItem}>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.wallet}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.data}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.id}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.sumUSDT}</span>
            </div>
        </div>
    );
};
