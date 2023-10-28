import React from 'react';
import {useAppSelector} from '../../hooks/app';
import styles from './styles.module.scss';
import {IListCardProps} from './types';

export const ListCard = () => {
    const {role} = useAppSelector(state => state.auth);
    const {income, turnover} = useAppSelector(state => state.payments);
    const {onPaymentBalance, frozenBalance} = useAppSelector(state => state.app.commonData);
    return (
        <ul className={styles.listCard}>
            <li className={styles.listCardItem}>
                <span className={styles.listCardText}>Оборот:</span>
                <span className={styles.listCardText}>{`${turnover.day} / ${turnover.total} ₽`}</span>
            </li>
            {role === 'trader' ? <li className={styles.listCardItem}>
                <span className={styles.listCardText}>Доход:</span>
                <span className={styles.listCardText}>{`${income.day} / ${income.total} ₽`}</span>
            </li> : null}
            <li className={styles.listCardItem}>
                <span className={styles.listCardText}>На оплате:</span>
                <span className={styles.listCardText}>{`${onPaymentBalance} ₽`}</span>
            </li>
            <li className={styles.listCardItem}>
                <span className={styles.listCardText}>Заморожено:</span>
                <span className={styles.listCardText}>{`${frozenBalance} ₽`}</span>
            </li>
        </ul>
    );
};
