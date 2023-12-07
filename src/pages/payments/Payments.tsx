import React, {useEffect, useState} from 'react';
import {MainLayout} from '../../layouts';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {SimpleCard} from '../../components/simpleCard';
import {IOption, StatusCardPayments} from '../../types';
import {ListCard} from '../../components/listCard';
import {TabsButtons} from '../../components/tabsButtons';
import {buttonsTabsPayments} from '../../utils/constants';
import {getMorePayments, getPayments, paymentsFilter} from './store/payments.thunk';
import styles from './styles.module.scss';
import {Filter, Table} from './components';

function generateParams(params: string[]): {params: string } {
    const notEmpty = params.filter(p => p !=='');
    return {params:  notEmpty.length > 0 ? notEmpty.join('&') : ''};
}

export const Payments = () => {
    const dispatch = useAppDispatch();
    const {
        payments,
        income,
        meta
    } = useAppSelector(state => state.payments);
    const {
        balance,
        onPaymentBalance
    } = useAppSelector(state => state.app.commonData);
    const {role} = useAppSelector(state => state.auth);
    const {exchangeRates} = useAppSelector(state => state.app);
    const [currentTab, setCurrentTab] = useState<IOption>(buttonsTabsPayments[0]);

    const [paramsBank, setParamsBank] = useState<string>('');
    const [paramsTab, setParamsTab] = useState<string>('');
    const [paramsNumCard, setParamsNumCard] = useState<string>('');

    useEffect(() => {
        const {params} = generateParams([paramsBank, paramsTab, paramsNumCard]);
        if(params !== '') {
            dispatch(paymentsFilter({params}));
        } else {
            dispatch(getPayments());
        }
        // if (paramsTab === '' && paramsBank === '') {
        //     dispatch(getPayments());
        // }
        // if (paramsBank !== '' && paramsTab === '') {
        //     dispatch(paymentsFilter({params: paramsBank}));
        // }
        // if (paramsTab !== '' && paramsBank === '') {
        //     dispatch(paymentsFilter({params: paramsTab}));
        // }
        // if (paramsBank !== '' && paramsTab !== '') {
        //     dispatch(paymentsFilter({params: `${paramsTab}&${paramsBank}`}));
        // }
    }, [paramsBank, paramsTab]);

    const handleTabs = (item: IOption) => {
        setCurrentTab(item);
        setParamsTab(item.value === 'all' ? '' : `status=${item.value}`);
    };

    const handleBankFilter = (params: string) => {
        setParamsBank(params === 'all' ? '' : `bank=${params}`);
    };
    const handleFilterByCard = (params: string) => {
        setParamsNumCard(params === 'all' ? '' : `number=${params}`);
    };

    const fetchMoreData = () => {
        dispatch(getMorePayments({
            url: meta.nextPageUrl,
            status: currentTab.value === 'all' ? null : currentTab.value as StatusCardPayments
        }));
    };



    return (
        <MainLayout titlePage={'Платежи'} descriptionPage={'Контролируйте выплаты на ваши реквизиты'}>
            <div id={'container'}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <SimpleCard
                            name={'Баланс'}
                            data={`${balance} ₽`}
                            additionalData={`$${(balance / exchangeRates.usdtrub).toFixed(2)}`}
                            footer={
                                <div className={styles.cardFooter}><span
                                    className={styles.cardFooterText}>{`${onPaymentBalance} ₽ на оплате`}</span>
                                </div>
                            }
                        />
                    </div>
                    {role === 'trader' ? <div className={styles.col}>
                        <SimpleCard
                            name={'Доход сегодня'}
                            data={`${income.day} ₽`}
                            additionalData={`$${(income.day / exchangeRates.usdtrub).toFixed(2)}`}
                            footer={
                                <div className={styles.cardFooter}><span
                                    className={styles.cardFooterText}>{'2% с каждого платежа'}</span>
                                </div>
                            }
                        />
                    </div> : null}
                    <div className={styles.col}>
                        <ListCard/>
                    </div>
                </div>
                <div className={'space-top-32'}/>
                <Filter handleFilterByCard={handleFilterByCard} handleBankFilter={handleBankFilter}/>
                <div className={'space-top-32'}/>
                <div className={styles.row}>
                    {/*<div className={'col'}>*/}
                    <TabsButtons items={buttonsTabsPayments} selected={currentTab}
                                 handleClick={item => handleTabs(item)}/>
                    {/*</div>*/}
                </div>
            </div>
            <div className={styles.row}>
                {/*<div className={styles.col}>*/}
                <Table items={payments} fetchMoreData={fetchMoreData} hasMore={meta.nextPageUrl !== null}/>
                {/*</div>*/}
            </div>
        </MainLayout>
    );
};
