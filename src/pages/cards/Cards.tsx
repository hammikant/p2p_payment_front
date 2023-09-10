import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {useLocation} from 'react-router-dom';
import {MainLayout} from '../../layouts';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {IOption} from '../../types';
import {TabsButtons} from '../../components/tabsButtons';
import {getBanks} from '../banks/store/banks.thunk';
import styles from './styles.module.scss';
import {Filter, Table} from './components';
import {cardsFilter,getCards, getCardsById, getMoreCards} from './store/cards.thunk';
import {StatusCard} from './components/TableItem';

const buttons: IOption[] = [
    {label: 'Все', value: 'all'},
    {label: 'Активна', value: StatusCard.active},
    {label: 'Не активна', value: StatusCard.inactive},
    {label: 'На паузе', value: StatusCard.paused},
];

const schema = yup.object({
    cardNumbers: yup.string().required('Добавьте несколько карт')
});

export const Cards = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {
        cards,
        meta
    } = useAppSelector(state => state.cards);
    const [currentTab, setCurrentTab] = useState<IOption>({label: buttons[0].label, value: buttons[0].value});

    useEffect(() => {
        if (location.state?.id) {
            dispatch(getCardsById({id: location.state?.id}));
        } else {
            dispatch(getCards({status: currentTab.value === 'all' ? null : currentTab.value as StatusCard}));
        }
        dispatch(getBanks());
    }, []);


    const handleTabs = (item: IOption) => {
        setCurrentTab(item);
        dispatch(cardsFilter({params: `status=${item.value}`}));
    };

    const fetchMoreData = () => {
        dispatch(getMoreCards({
            url: meta.nextPageUrl,
            status: currentTab.value === 'all' ? null : currentTab.value as StatusCard
        }));
    };

    return (
        <MainLayout titlePage={'Карты'} descriptionPage={'На эти карты мы будем переводить деньги с вашего баланса'}>
            <div className={'space-top-32'}/>
            <Filter/>
            <div className={'space-top-32'}/>
            <div className={styles.row}>
                <div className={styles.col}>
                    <TabsButtons items={buttons} selected={currentTab} handleClick={item => handleTabs(item)}/>
                </div>
            </div>
            <Table items={cards} fetchMoreData={fetchMoreData} hasMore={meta.nextPageUrl !== null}/>
        </MainLayout>
    );
};
