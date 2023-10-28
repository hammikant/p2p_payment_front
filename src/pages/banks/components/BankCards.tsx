import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {IBank} from '../store/types';
import styles from './styles.module.scss';
import {BankCard} from './BankCard';

export interface IBankCardsProps {
    items: IBank[];
    handleFetchMore: () => void;
    hasMore: boolean;
}

export const BankCards = ({items, handleFetchMore, hasMore}: IBankCardsProps) => {
    const [heightTable, setHeightTable] = useState<number>(0);

    useEffect(() => {
        const height = window.innerHeight;
        setHeightTable(height / 1.8);
    }, []);

    return (
        <div className={styles.row}>
            <InfiniteScroll
                dataLength={items.length}
                next={() => {
                    handleFetchMore();
                }}
                hasMore={hasMore}
                loader={<p className={styles.loader}>loading ...</p>}
                height={heightTable}
                className={'infinityContainer infinityContainerFlex'}
            >
                {items.map((item, index) => <BankCard key={`${item.id}-${index}`} item={item}/>)}
            </InfiniteScroll>

        </div>
    );
};
