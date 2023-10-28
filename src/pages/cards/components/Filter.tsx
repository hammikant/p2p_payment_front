import React from 'react';
import {SearchByBank} from '../../../fields';
import {SearchByBankProps} from '../../../types';
import styles from './styles.module.scss';
import {SearchByCardNum} from './SearchByCardNum';

interface FilterProps extends SearchByBankProps{
    handleInputFilter: (params: string) => void;
}

export const Filter = ({handleBankFilter, handleInputFilter}:FilterProps) => {

    return (
        <div className={styles.searchByCard}>
            <div className={styles.searchByCardItem}>
                <SearchByCardNum handleInputFilter={handleInputFilter} />
            </div>
            <div className={styles.searchByCardItem}>
             <SearchByBank handleBankFilter={handleBankFilter} />
            </div>
        </div>
    );
};
