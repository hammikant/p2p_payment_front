import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {ICard} from '../store/types';
import styles from './styles.module.scss';
import {TableItem} from './TableItem';
import {TableHead} from './TableHead';

interface ITableProps {
    items: ICard[];
    fetchMoreData: () => void;
    hasMore: boolean;
}

const heads: string[] = ['Счёт', 'Дата', 'ID', '', 'Статус'];

export const Table = ({items, hasMore, fetchMoreData}: ITableProps) => {
    const [heightTable, setHeightTable] = useState<number>(0);

    useEffect(() => {
        const height = window.innerHeight / 1.8;
        setHeightTable(height);
    }, []);

    return (
        <div className={styles.table}>
            <div className={styles.tableItemHeader}>
                {heads.map((name, index) => <TableHead key={index} name={name}/>)}
            </div>
            {items.length > 0 ? <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<p className={styles.loader}>loading ...</p>}
                height={heightTable - 50}
                className={'infinityContainer'}
            >
                {items.map((item) => <TableItem key={item.id} item={item}/>)}
            </InfiniteScroll> : null}
        </div>
    );
};

