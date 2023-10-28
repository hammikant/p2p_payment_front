import React from 'react';
import {SearchByBank} from '../../../fields';
import {SearchByBankProps} from '../../../types';
import styles from './styles.module.scss';


export const Filter = ({handleBankFilter}:SearchByBankProps) => {

    return (
        <form className={styles.searchByCard}>
            {/*<div className={styles.searchByCardItem}>*/}
            {/*    <SearchByCardNum />*/}
            {/*</div>*/}
            <div className={styles.searchByCardItem}>
               <SearchByBank handleBankFilter={handleBankFilter} />
            </div>
        </form>
    );
};
