import React from 'react';
import {ICard} from '../store/types';
import gazprom from '../../../assets/images/gazprom.png';
import raiffeisen from '../../../assets/images/raiffeisen.png';
import akbars from '../../../assets/images/akbars.png';
import vtb from '../../../assets/images/vtb.png';
import tinkoff from '../../../assets/images/tinkoff.png';
import alfa from '../../../assets/images/alfa.png';
import sber from '../../../assets/images/sber.png';
import sbp from '../../../assets/images/sbp.png';
import styles from './styles.module.scss';

const icons: { [key: string]: string } = {
    gazprom,
    raiffeisen,
    akbars,
    vtb,
    tinkoff,
    alfa,
    sber,
    sbp
};

const colorsStatus: { [key: string]: string } = {
    'Успех': '#91F230',
    'Заморожено': '#4972CF',
    'Оплата': '#667180',
    'Отмена': '#F22451'
};

export const TableItem = ({item}: { item: ICard }) => {
    return (
        <div className={styles.tableItem}>
            <div className={styles.item}>
                <img src={icons[item.bankName as string]}/>
                <span className={styles.itemText}>{item.num}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.data}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.id}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.sum}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}>{item.profit}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemText}
                      style={{color: colorsStatus[item.status as string]}}>{item.status}</span>
            </div>
        </div>
    );
};
