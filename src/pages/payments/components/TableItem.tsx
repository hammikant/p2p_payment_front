import React from 'react';
import {IPayments} from '../store/types';
import {icons} from '../../../utils/constants';
import {useAppSelector} from '../../../hooks/app';
import {formatPhoneNumber} from '../../../utils';
import styles from './styles.module.scss';

const colorsStatus: { [key: string]: string } = {
    'approved': '#91F230',
    'frozen': '#4972CF',
    'on_payment': '#667180',
    'canceled': '#F22451',
    pending: '#858585',
    confirmation: '#858585'
};

const viewStatus:{[key:string]: string} = {
    on_payment: 'Оплата',
    frozen: 'Заморожено',
    approved: 'Успех',
    canceled: 'Отмена',
    pending: 'Ожидает оплаты',
    confirmation: 'Ожидает подтв.'
};

export const TableItem = ({item}: { item: IPayments }) => {
    const {role} = useAppSelector(state => state.auth);
    const isSBP = item.cardNumber === null;
    return (
        <div className={styles.tableItem}>
            <div className={styles.item}>
                <img src={isSBP ? icons['sbp'] : icons[item.bank]} alt={'icon'}/>
                <span className={styles.itemText}>{isSBP ? formatPhoneNumber(item.phoneNumber) : item.cardNumber}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.updatedAt}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.id}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.amount}</span>
            </div>
            {role === 'trader' ? <div className={styles.item}>
                <span className={styles.itemText}>{item.profit}</span>
            </div> : null}
            <div className={styles.item}>
                <span className={styles.itemText}
                      style={{color: colorsStatus[item.status as string]}}>{viewStatus[item.status]}</span>
            </div>
        </div>
    );
};
