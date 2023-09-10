import React from 'react';
import styles from './styles.module.scss';
import {SearchByCardNum} from './SearchByCardNum';
import {SearchByBank} from './SearchByBank';


export const Filter = () => {

    return (
        <form className={styles.searchByCard}>
            <div className={styles.searchByCardItem}>
                <SearchByCardNum />
            </div>
            <div className={styles.searchByCardItem}>
               <SearchByBank />
            </div>
        </form>
    );
};
