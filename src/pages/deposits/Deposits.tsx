import React, {useEffect} from 'react';
import classNames from 'classnames';
import {MainLayout} from '../../layouts';
import {SimpleCard} from '../../components/simpleCard';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {Refresh, TrendDown, TrendUp} from '../../icons';
import {getAccount} from '../../store/app.slice';
import {ICommonData} from '../../types';
import styles from './styles.module.scss';
import {Calculator, Table, Wallet} from './components';
import {checkDeposit, getDeposits, getMoreDeposits} from './store/deposit.thunk';

export const Deposits = () => {
    const dispatch = useAppDispatch();
    const {commonData, loading, exchangeRates} = useAppSelector(state => state.app);
    const {deposits, meta} = useAppSelector(state => state.deposits);
    const {onPaymentBalance, balance, wallet, walletQR} = commonData as ICommonData;

    useEffect(() => {
        dispatch(getDeposits());
        dispatch(getAccount());
    }, []);

    const handleRefresh = () => {
        dispatch(checkDeposit());
        dispatch(getDeposits());
        dispatch(getAccount());
    };

    const handleCalculation = () => {

    };

    const fetchMoreData = () => {
        dispatch(getMoreDeposits({url: meta.nextPageUrl}));
    };
    const balanceUs = balance;
    return (
        <MainLayout titlePage={'Депозиты'}>
            <div id={'container'}>
            <div className={'row'}>
                <div className={styles.box}>
                    <SimpleCard
                        name={'Баланс'}
                        data={`${balance} ₽`}
                        additionalData={`$${(balance / exchangeRates.usdtrub).toFixed(2)}`}
                        footer={
                            <div className={styles.cardFooter}>
                                <div className={styles.reload}>
                                    <div
                                        className={loading ? classNames(styles.reloadIcon, styles.reloadLoad) : styles.reloadIcon}>
                                        <Refresh/>
                                    </div>
                                    <button className={styles.reloadText} onClick={handleRefresh}>Проверить пополнения
                                    </button>
                                </div>
                                <span className={styles.rates}>
                                    USDТ
                                </span>
                            </div>
                        }
                    />
                </div>
                <div className={styles.box}>
                    <Calculator exchangeRates={exchangeRates.usdtrub} handleCalculation={handleCalculation}/>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col'}>
                    <p className={styles.description}>Для пополнения баланса отправьте любую сумму на ваш личный Tether
                        TRC-20 адрес и нажмите «Проверить пополнения» через несколько минут</p>
                    <Wallet wallet={wallet} walletQR={walletQR}/>
                </div>
            </div>
            <div className={'space-top-32'}/>
            <h3 className={styles.sectionTitle}>Транзакции</h3>
            </div>
            <div className={'row'}>
                <div className={'col'}>
                    <Table items={deposits} hasMore={!meta.isLastPage} fetchMoreData={fetchMoreData}/>
                </div>
            </div>
        </MainLayout>
    );
};
