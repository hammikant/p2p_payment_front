import React, {useEffect} from 'react';
import classNames from 'classnames';
import {MainLayout} from '../../layouts';
import {SimpleCard} from '../../components/simpleCard';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {Refresh, TrendDown, TrendUp} from '../../icons';
import {getCommonData} from '../../store/app.slice';
import styles from './styles.module.scss';
import {Calculator, Table, Wallet} from './components';
import {getDeposits, getMoreDeposits} from './store/deposit.thunk';

export const Deposits = () => {
    const dispatch = useAppDispatch();
    const {commonData, loading} = useAppSelector(state => state.app);
    const {list, meta} = useAppSelector(state => state.deposits);
    const {exchangeRates, balance, balanceUs, wallet, walletQRCode} = commonData;

    useEffect(() => {
        dispatch(getDeposits());
    }, []);

    const handleRefresh = () => {
        dispatch(getCommonData());
    };

    const handleCalculation = () => {

    };

    const fetchMoreData = () => {
        dispatch(getMoreDeposits({url: meta.nextPageUrl}));
    };

    return (
        <MainLayout titlePage={'Депозиты'}>
            <div className={'row'}>
                <div className={'col'}>
                    <SimpleCard
                        name={'Баланс'}
                        data={`${balance} ₽`}
                        additionalData={`$${balanceUs}`}
                        footer={
                            <div className={styles.cardFooter}>
                                <div className={styles.reload}>
                                    <div
                                        className={loading ? classNames(styles.reloadIcon, styles.reloadLoad) : styles.reloadIcon}>
                                        <Refresh/></div>
                                    <button className={styles.reloadText} onClick={handleRefresh}>Проверить пополнения
                                    </button>
                                </div>
                                <span className={styles.rates}>
                                    USDТ {exchangeRates.currentRate}
                                    {exchangeRates.trend === 'up' ? <TrendUp/> : <TrendDown/>}
                                </span>
                            </div>
                        }
                    />
                </div>
                <div className={'col'}>
                    <Calculator exchangeRates={exchangeRates.currentRate} handleCalculation={handleCalculation}/>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col'}>
                    <p className={styles.description}>Для пополнения баланса отправьте любую сумму на ваш личный Tether
                        TRC-20 адрес и нажмите «Проверить пополнения» через несколько минут</p>
                    <Wallet wallet={wallet} walletQRCode={walletQRCode}/>
                </div>
            </div>
            <div className={'space-top-32'}/>
            <h3 className={styles.sectionTitle}>Транзакции</h3>
            <div className={'row'}>
                <div className={'col'}>
                    <Table items={list} hasMore={!meta.isLastPage} fetchMoreData={fetchMoreData}/>
                </div>
            </div>
        </MainLayout>
    );
};
