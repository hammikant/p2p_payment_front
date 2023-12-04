import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {IHistoryActions} from '../../auth/store/auth.slice';
import styles from './styles.module.scss';
import {TableItem} from './TableItem';
import {TableHead} from './TableHead';

interface ITableProps {
    items: IHistoryActions[],
    fetchMoreData: () => void;
    hasMore: boolean;
}

const heads: string[] = ['Дата', 'Действие', 'IP-адрес', 'ID', 'User agent'];

export const Table = ({items, fetchMoreData, hasMore}: ITableProps) => {
    const [heightTable, setHeightTable] = useState<number>(0);

    useEffect(() => {
        const height = window.innerHeight / 4;
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
                height={heightTable - 50}
                className={'infinityContainer'}
            >
                {items.map((item) => <TableItem key={item.id} item={item}/>)}
            </InfiniteScroll> : null}
        </div>
    );
};

