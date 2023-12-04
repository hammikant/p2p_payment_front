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
        const rootHeight = document.getElementById('root').clientHeight;
        const containerHeight = document.getElementById('container').clientHeight;
        const height = rootHeight - containerHeight - 126 - 76 - 16;
        setHeightTable(height);
    }, []);

    return (
        <div className={'table'}>
            <div className={'tableHead'}>
                {heads.map((name, index) => <TableHead key={index} name={name}/>)}
            </div>
            {items.length > 0 ? <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<span></span>}
                height={heightTable}
                className={'infinityContainer'}
            >
                {items.map((item) => <TableItem key={item.id} item={item}/>)}
            </InfiniteScroll> : null}
        </div>
    );
};

