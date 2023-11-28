import React from 'react';
import {Button, SearchByBank} from '../../../fields';
import {SearchByBankProps} from '../../../types';
import {ArrowBottom} from '../../../icons';
import {useAppSelector} from '../../../hooks/app';
import styles from './styles.module.scss';
import {SearchByCardNum} from './SearchByCardNum';


export const Filter = ({handleBankFilter}: SearchByBankProps) => {
    const {role} = useAppSelector(state => state.auth);
    return (
        <form className={styles.searchByCard}>
            <div className={styles.searchByCardItem}>
                <SearchByCardNum />
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
        </form>
    )
        ;
};
