import React, {useEffect, useState} from 'react';
import {MainLayout} from '../../layouts';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {SimpleCard} from '../../components/simpleCard';
import {IOption} from '../../types';
import {ListCard} from '../../components/listCard';
import {getPayments} from './store/payments.thunk';
import styles from './styles.module.scss';
import {ICard, ICommonDataPayments} from './store/types';
import {SearchByCardNumber, Table, TabsButtons} from './components';

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
        balance,
        balanceUs,
        incomeToday,
        incomeTodayUs,
        commonData,
        cards
    } = useAppSelector(state => state.payments);
    const [listOptions, setListOptions] = useState<IOption[]>([]);
    const [currentTab, setCurrentTab] = useState<IOption>({label: buttons[0].label, value: buttons[0].value});
    const [showCards, setShowCards] = useState<ICard[]>([]);

    useEffect(() => {
        dispatch(getPayments());
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
        setShowCards(cards);
    }, [commonData]);

    const handleTabs = (item: IOption) => {
        setCurrentTab(item);
        if (item.value === 'all') {
            setShowCards(cards);
        } else {
            const sortItems = cards.filter(card => card.status === item.label);
            setShowCards(sortItems);
        }
    };

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
                                className={styles.cardFooterText}>{`${commonData.payments} ₽ на оплате`}</span>
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
                    <Table items={showCards}/>
                </div>
            </div>
        </MainLayout>
    );
};
