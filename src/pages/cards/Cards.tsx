import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {MainLayout} from '../../layouts';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {IOption} from '../../types';
import {Modal} from '../../components/modal';
import {Button, SubTitle, TextareaField} from '../../fields';
import {Close} from '../../icons';
import {TabsButtons} from '../../components/tabsButtons';
import styles from './styles.module.scss';
import {SearchByCardNumber, Table} from './components';
import {connectCards, getCards, getMoreCards, StatusCard} from './store/cards.thunk';
import {ICard} from './store/types';

const buttons: IOption[] = [
    {label: 'Все', value: 'all'},
    {label: 'Активна', value: 'active'},
    {label: 'Не активна', value: 'notActive'},
    {label: 'На паузе', value: 'pause'},
];

const schema = yup.object({
    cards: yup.string().required('Добавьте несколько карт')
});

export const Cards = () => {
    const dispatch = useAppDispatch();
    const {
        cards,
        meta
    } = useAppSelector(state => state.cards);
    const [currentTab, setCurrentTab] = useState<IOption>({label: buttons[0].label, value: buttons[0].value});
    const [showCards, setShowCards] = useState<ICard[]>([]);
    const [connectModal, setConnectModal] = useState<boolean>(false);

    const {control, register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        dispatch(getCards({status: currentTab.value === 'all' ? null : currentTab.value as StatusCard}));
    }, []);


    const handleTabs = (item: IOption) => {
        setCurrentTab(item);
        dispatch(getMoreCards({url: meta.nextPageUrl, status: item.value === 'all' ? null : item.value as StatusCard}));
    };

    const submitCards = handleSubmit(values => {
        dispatch(connectCards({cards: values.cards}));
        reset();
        setConnectModal(false);
    });
    const fetchMoreData = () => {
        dispatch(getMoreCards({
            url: meta.nextPageUrl,
            status: currentTab.value === 'all' ? null : currentTab.value as StatusCard
        }));
    };

    return (
        <MainLayout titlePage={'Карты'} descriptionPage={'На эти карты мы будем переводить деньги с вашего баланса'}>
            <button className={styles.connectCardButton} onClick={() => setConnectModal(true)}>Подключить карту</button>
            <div className={'space-top-32'}/>
            <SearchByCardNumber/>
            <div className={'space-top-32'}/>
            <div className={styles.row}>
                <div className={styles.col}>
                    <TabsButtons items={buttons} selected={currentTab} handleClick={item => handleTabs(item)}/>
                </div>
            </div>
            <Table items={cards} fetchMoreData={fetchMoreData} hasMore={!meta.isLastPage}/>
            <Modal
                show={connectModal}
                widthContent={'472px'}
                backgroundColorOverlay={'rgba(13,17,20,0.57)'}
                handleClickOverlay={() => setConnectModal(!connectModal)}>
                <form className={styles.connectModal} onSubmit={submitCards}>
                    <span className={styles.connectModalClose} onClick={() => setConnectModal(false)}><Close
                        color={'#667180'} height={'32'} width={'32'}/></span>
                    <SubTitle text={'Подключить карты'}/>
                    <p className={styles.connectModalText}>Чтобы добавить несколько карт, вставьте их списком через
                        запятую,
                        пробел или перенос строки. Можно добавить до 100 карт одновременно.</p>

                    <TextareaField
                        control={control}
                        register={register}
                        fieldName={'cards'}
                        errors={errors}
                        rows={10}
                        backgroundLight={false}/>
                    <div className={'space-top-32'}/>
                    <Button text={'Подключить'} style={{width: '182px'}}/>
                </form>

            </Modal>
        </MainLayout>
    );
};
