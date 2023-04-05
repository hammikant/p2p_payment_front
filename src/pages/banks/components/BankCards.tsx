import React from 'react';
import {IBank} from '../store/types';
import styles from './styles.module.scss';
import {BankCard} from './BankCard';

interface IBankCardsProps {
    items: IBank[]
}

export const BankCards = ({items}: IBankCardsProps) => {

    const handlePressCard = () => {

    };
    return (
        <div className={styles.row}>
            {items.map(item => <BankCard key={item.id} item={item} handlePressCard={handlePressCard}/>)}
        </div>
    );
};
