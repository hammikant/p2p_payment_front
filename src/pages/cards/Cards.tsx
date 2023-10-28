import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {useLocation} from 'react-router-dom';
import {MainLayout} from '../../layouts';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {IOption} from '../../types';
import {TabsButtons} from '../../components/tabsButtons';
import {  getBanks} from '../banks/store/banks.thunk';
import { buttonsTabsCards} from '../../utils/constants';
import styles from './styles.module.scss';
import {Filter, Table} from './components';
import {cardsFilter,getCards, getCardsById, getMoreCards} from './store/cards.thunk';
import {StatusCard} from './components/TableItem';

export const Cards = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {
        cards,
        meta
    } = useAppSelector(state => state.cards);
    const [currentTab, setCurrentTab] = useState<IOption>(buttonsTabsCards[0]);
    const [paramsBank, setParamsBank] = useState<string>('');
    const [paramsTab, setParamsTab] = useState<string>('');
    const [paramsInput, setParamsInput] = useState<string>('');

    useEffect(() => {
        if (location.state?.id) {
            dispatch(getCardsById({id: location.state?.id}));
        } else {
            dispatch(getCards({status: currentTab.value === 'all' ? null : currentTab.value as StatusCard}));
        }
        dispatch(getBanks());
    }, []);

    useEffect(() => {

        if(paramsTab === '' && paramsBank === '' && paramsInput === '') {
            dispatch(getCards({status: null}));
        } else {
            dispatch(cardsFilter({params: `${paramsBank}${paramsTab}${paramsInput}`}));
        }
    }, [paramsBank, paramsTab, paramsInput]);


    const handleTabs = (item: IOption) => {
        setCurrentTab(item);
        setParamsTab(item.value === 'all' ? '' : `&status=${item.value}`);
    };

    const handleBankFilter = (params:string) => {
        setParamsBank(params === 'all' ? '' : `&bank=${params}`);
    };

    const handleInputFilter = (params: string) => {
        setParamsInput(params === '' ? '' : `&number=${params}`);
    };

    const fetchMoreData = () => {
        dispatch(getMoreCards({
            url: meta.nextPageUrl,
            status: currentTab.value === 'all' ? null : currentTab.value as StatusCard
        }));
    };

    return (
        <MainLayout titlePage={'Карты'} descriptionPage={'На эти карты мы будем переводить деньги с вашего баланса'}>
            <div id={'container'}>
            <div className={'space-top-32'}/>
            <Filter handleBankFilter={handleBankFilter} handleInputFilter={handleInputFilter}/>
            <div className={'space-top-32'}/>
            <div className={styles.row}>
                <div className={styles.col}>
                    <TabsButtons items={buttonsTabsCards} selected={currentTab} handleClick={item => handleTabs(item)}/>
                </div>
            </div>
            </div>
            <Table items={cards} fetchMoreData={fetchMoreData} hasMore={meta.nextPageUrl !== null}/>
        </MainLayout>
    );
};
