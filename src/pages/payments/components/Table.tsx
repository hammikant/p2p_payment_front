import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {IPayments} from '../store/types';
import {useAppSelector} from '../../../hooks/app';
import styles from './styles.module.scss';
import {TableItem} from './TableItem';
import {TableHead} from './TableHead';

interface ITableProps {
    items: IPayments[],
    fetchMoreData: () => void;
    hasMore: boolean;
}

const heads: string[] = ['Счёт', 'Дата', 'ID', 'Сумма, ₽', 'Прибыль, ₽', 'Статус'];
const headsMerchant: string[] = ['Счёт', 'Дата', 'ID', 'Сумма, ₽', 'Статус'];

export const Table = ({items, fetchMoreData, hasMore}: ITableProps) => {
    const {role} = useAppSelector(state => state.auth);
    const [heightTable, setHeightTable] = useState<number>(0);

    useEffect(() => {
        const rootHeight = document.getElementById('root').clientHeight;
        const containerHeight = document.getElementById('container').clientHeight;
        const height = rootHeight - containerHeight - 126 - 76 - 32;
        setHeightTable(height);
    }, []);

    return (
        <div className={'table'} >
            <div className={'tableHead'}>
                { role === 'trader'
                   ?  heads.map((name, index) => <TableHead key={index} name={name}/>)
                    : headsMerchant.map((name, index) => <TableHead key={index} name={name}/>)
                }
            </div>
            {items?.length > 0 && heightTable > 0 ? <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<span></span>}
                height={heightTable}
                scrollThreshold={'200px'}
                className={'infinityContainer'}
            >
                {items?.map((item) => <TableItem key={item.id} item={item}/>)}
            </InfiniteScroll> : null}
        </div>
    );
};

