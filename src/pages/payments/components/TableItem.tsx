import React from 'react';
import {IPayments} from '../store/types';
import styles from './styles.module.scss';

const colorsStatus: { [key: string]: string } = {
    'success': '#91F230',
    'frozen': '#4972CF',
    'on_payment': '#667180',
    'canceled': '#F22451'
};

const viewStatus:{[key:string]: string} = {
    on_payment: 'Оплата',
    frozen: 'Заморожено',
    success: 'Успех',
    canceled: 'Отмена'
};

export const TableItem = ({item}: { item: IPayments }) => {
    return (
        <div className={styles.tableItem}>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.cardNumber}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.date}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.id}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.amount}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.profit}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}
                      style={{color: colorsStatus[item.status as string]}}>{viewStatus[item.status]}</span>
            </div>
        </div>
    );
};
