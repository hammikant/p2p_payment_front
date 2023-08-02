import React, {useEffect, useState} from 'react';
import {MainLayout} from '../../layouts';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {SimpleCard} from '../../components/simpleCard';
import {IOption, StatusCardPayments} from '../../types';
import {ListCard} from '../../components/listCard';
import {TabsButtons} from '../../components/tabsButtons';
import {getAccount} from '../../store/app.slice';
import {getMorePayments, getPayments} from './store/payments.thunk';
import styles from './styles.module.scss';
import {ICommonDataPayments} from './store/types';
import {SearchByCardNumber, Table} from './components';

const listLabels: { [key: string]: string } = {
    payments: 'Платежей:',
    turnover: 'Оборот:',
    income: 'Доход:',
    onPayment: 'На оплате:',
    frozen: 'Заморожено:',
};

const buttons: IOption[] = [
    {label: 'Все', value: 'all'},
    {label: 'Успех', value: 'success'},
    {label: 'Заморожено', value: 'frozen'},
    {label: 'Оплата', value: 'payment'},
    {label: 'Отмена', value: 'cancellation'},
];

export const Payments = () => {
    const dispatch = useAppDispatch();
    const {
        commonData,
        payments,
        meta
    } = useAppSelector(state => state.payments);
    const {
        balance,
        incomeToday,
        exchangeRates
    } = useAppSelector(state => state.app.commonData);
    const [listOptions, setListOptions] = useState<IOption[]>([]);
    const [currentTab, setCurrentTab] = useState<IOption>({label: buttons[0].label, value: buttons[0].value});


    useEffect(() => {
        dispatch(getAccount());
        dispatch(getPayments({status: currentTab.value === 'all' ? null : currentTab.value as StatusCardPayments}));
    }, []);


    useEffect(() => {
        const createOptions: IOption[] = [];
        for (const key in commonData) {
            createOptions.push({
                label: listLabels[key],
                value: commonData[key as keyof ICommonDataPayments].toString()
            });
        }
        setListOptions(createOptions);
    }, [commonData]);

    const handleTabs = (item: IOption) => {
        setCurrentTab(item);
        dispatch(getPayments({status: item.value === 'all' ? null : item.value as StatusCardPayments}));
    };

    const fetchMoreData = () => {
        dispatch(getMorePayments({
            url: meta.nextPageUrl,
            status: currentTab.value === 'all' ? null : currentTab.value as StatusCardPayments
        }));
    };
    const balanceUs = balance > 0 ? Math.round(balance / exchangeRates.sellingRate) : balance;
    const incomeTodayUs = incomeToday > 0 ? Math.round(incomeToday * exchangeRates.sellingRate) : incomeToday;
    return (
        <MainLayout titlePage={'Платежи'} descriptionPage={'Контролируйте выплаты на ваши реквизиты'}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <SimpleCard
                        name={'Баланс'}
                        data={`${balance} ₽`}
                        additionalData={`$${balanceUs}`}
                        footer={
                            <div className={styles.cardFooter}><span
                                className={styles.cardFooterText}>{`${commonData.onPayment} ₽ на оплате`}</span>
                            </div>
                        }
                    />
                </div>
                <div className={styles.col}>
                    <SimpleCard
                        name={'Доход сегодня'}
                        data={`${incomeToday} ₽`}
                        additionalData={`$${incomeTodayUs}`}
                        footer={
                            <div className={styles.cardFooter}><span
                                className={styles.cardFooterText}>{'2% с каждого платежа'}</span>
                            </div>
                        }
                    />
                </div>
                <div className={styles.col}>
                    <ListCard items={listOptions}/>
                </div>
            </div>
            <div className={'space-top-32'}/>
            <SearchByCardNumber/>
            <div className={'space-top-32'}/>
            <div className={styles.row}>
                <div className={styles.col}>
                    <TabsButtons items={buttons} selected={currentTab} handleClick={item => handleTabs(item)}/>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Table items={payments} fetchMoreData={fetchMoreData} hasMore={!meta.isLastPage}/>
                </div>
            </div>
        </MainLayout>
    );
};
