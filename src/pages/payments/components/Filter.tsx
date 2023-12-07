import React from 'react';
import {Button, SearchByBank} from '../../../fields';
import {SearchByBankProps} from '../../../types';
import {ArrowBottom} from '../../../icons';
import {useAppSelector} from '../../../hooks/app';
import styles from './styles.module.scss';
import {SearchByCardNum} from './SearchByCardNum';


export const Filter = ({handleBankFilter, handleFilterByCard}: SearchByBankProps) => {
    const {role} = useAppSelector(state => state.auth);
    return (
        <div className={styles.searchByCard}>
            <div className={styles.searchByCardItem}>
                <SearchByCardNum handleFilterByCard={handleFilterByCard} />
            </div>
            <div className={styles.searchByCardItem}>
                <SearchByBank handleBankFilter={handleBankFilter}/>
            </div>
            <div className={styles.searchByCardItem}>
                {
                    role === 'merchant' ? (
                        <Button
                            text={'Загрузить CSV'}
                            variant={'outline'}
                            type={'button'}
                            icon={<span className={styles.searchByCardSvg}><ArrowBottom/></span>}
                            iconPosition={'right'}/>
                    ) : null
                }

            </div>
        </div>
    )
        ;
};
