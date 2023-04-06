import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {IBank} from '../store/types';
import styles from './styles.module.scss';
import {BankCard} from './BankCard';

interface IBankCardsProps {
    items: IBank[]
}

export const BankCards = ({items}: IBankCardsProps) => {
    const [heightTable, setHeightTable] = useState<number>(0);

    useEffect(() => {
        const height = window.innerHeight;
        setHeightTable(height / 1.5);
    }, []);

    const handlePressCard = () => {

    };
    return (
        <div className={styles.row}>
            <InfiniteScroll
                dataLength={items.length}
                next={() => console.log('@@@fetch')}
                hasMore={true}
                loader={<p className={styles.loader}>loading ...</p>}
                height={heightTable}
                className={styles.infinityContainer}
            >
                {items.map(item => <BankCard key={item.id} item={item} handlePressCard={handlePressCard}/>)}
            </InfiniteScroll>

        </div>
    );
};
