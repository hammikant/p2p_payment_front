import React from 'react';
import {ICard} from '../store/types';
import styles from './styles.module.scss';
import {TableItem} from './TableItem';
import {TableHead} from './TableHead';

interface ITableProps {
    items: ICard[]
}

const heads: string[] = ['Счёт', 'Дата', 'ID', 'Банк', 'Статус'];

export const Table = ({items}: ITableProps) => {
    return (
        <div className={styles.table}>
            <div className={styles.tableItemHeader}>
                {heads.map((name, index) => <TableHead key={index} name={name}/>)}
            </div>
            {items.map(item => <TableItem key={item.id} item={item}/>)}
        </div>
    );
};

