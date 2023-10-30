import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {ReactSearchAutocomplete} from 'react-search-autocomplete';
import {MainLayout} from '../../layouts';
import {Modal} from '../../components/modal';
import {Button, InputField, Select, SubTitle, Switcher} from '../../fields';
import {Close} from '../../icons';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {IOption} from '../../types';
import {TabsButtons} from '../../components/tabsButtons';
import {buttonsTabs} from '../../utils/constants';
import {formatPhoneNumber} from '../../utils';
import styles from './styles.module.scss';
import {addBank, banksFilter, getAllPhoneNumbers, getBanks, getMoreBanks} from './store/banks.thunk';
import {IBank} from './store/types';
import {BankCards} from './components/BankCards';
import {SwitchersRow} from './components';
import {Filter} from './components/Filter';
import {setUseFilterStatus} from './store/banks.slice';


const bankNames: IOption[] = [
    {label: 'Газпром', value: 'gazrpom'},
    {label: 'Райфайзен', value: 'raifaisen'},
    {label: 'Акбарс', value: 'akbars'},
    {label: 'ВТБ', value: 'vtb'},
    {label: 'Тинькофф', value: 'tinkoff'},
    {label: 'Альфа', value: 'alfa'},
    {label: 'Сбербанк', value: 'sber'},
];

const schema = yup.object({
    bank: yup.string().required('Обязательное поле'),
    name: yup.string().max(25, 'Максимум 25 символов').required('Обязательное поле'),
    phoneNumber: yup.string().max(12, 'Максимум 12 символов').required('Обязательное поле'),
    isAcceptingPayments: yup.boolean().default(false),
    isAcceptingSbp: yup.boolean().default(false),
});

export const Banks = () => {
    const dispatch = useAppDispatch();
    const {list, meta, numbers} = useAppSelector(state => state.banks);
    const [connectModal, setConnectModal] = useState<boolean>(false);
    const [currentTab, setCurrentTab] = useState<IOption>(buttonsTabs[0]);
    const [paramsBank, setParamsBank] = useState<string>('');
    const [paramsTab, setParamsTab] = useState<string>('');

    useEffect(() => {
        if (paramsTab === '' && paramsBank === '') {
            dispatch(getBanks());
        }
        if (paramsBank !== '' && paramsTab === '') {
            dispatch(banksFilter({params: paramsBank}));
        }
        if (paramsTab !== '' && paramsBank === '') {
            dispatch(banksFilter({params: paramsTab}));
        }
        if (paramsBank !== '' && paramsTab !== '') {
            dispatch(banksFilter({params: `${paramsTab}&${paramsBank}`}));
        }

        return () => {
            dispatch(setUseFilterStatus(false));
        };
    }, [paramsBank, paramsTab]);

    const {control, register, setValue, watch, formState: {errors}, reset, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        setValue('bank', bankNames[0].value);
        setValue('isAcceptingPayments', false);
        setValue('isAcceptingSbp', false);
    }, []);

    const handleTabs = (item: IOption) => {
        setCurrentTab(item);
        setParamsTab(item.value === 'all' ? '' : item.value);
    };

    const handleBankFilter = (params: string) => {
        setParamsBank(params === 'all' ? '' : `bank=${params}`);
    };

    const submit = handleSubmit(values => {
        dispatch(addBank({bank: {...values, isVerified: false} as IBank}));
        reset();
        setConnectModal(false);
    });

    const handleFetchMore = () => {
        dispatch(getMoreBanks({url: meta.nextPageUrl, status: currentTab.value}));
    };

    const formatResult = (item: {id: number, name: string}) => {
        return (
            <span style={{display: 'block', textAlign: 'left'}}>{formatPhoneNumber(item.name)}</span>
        );
    };


    const handleOnSelect = (item: any) => {
        // the item selected
        console.log(item);
        setValue('phoneNumber', item.name);
    };

    return (
        <MainLayout titlePage={'Банки'} descriptionPage={'На эти карты мы будем переводить деньги с вашего баланса'}>
            <Button text={'Подключить банк'} variant={'outline'} onClick={() => {
                dispatch(getAllPhoneNumbers());
                setConnectModal(true);
            }}/>
            <div className={'space-top-32'}/>
            <Filter handleBankFilter={handleBankFilter}/>
            <div className={'space-top-32'}/>
            <TabsButtons items={buttonsTabs} selected={currentTab} handleClick={item => handleTabs(item)}/>
            <div className={'space-top-24'}/>
            <BankCards items={list} hasMore={!meta.isLastPage} handleFetchMore={handleFetchMore}/>
            <Modal
                show={connectModal}
                widthContent={'472px'}
                backgroundColorOverlay={'rgba(13,17,20,0.57)'}
                handleClickOverlay={() => setConnectModal(!connectModal)}>
                <span className={styles.modalBankClose} onClick={() => setConnectModal(false)}>
                    <Close width={'18'} height={'18'} color={'#667180'}/>
                </span>
                <SubTitle text={'Подключить банк'}/>

                <form onSubmit={submit}>
                    <div className={'space-top-32'}/>
                    <Select
                        label={'Банк'}
                        control={control}
                        register={register}
                        fieldName={'bank'}
                        errors={errors}
                        watch={watch}
                        options={bankNames}
                        setValue={setValue}/>
                    <div className={'space-top-24'}/>
                    <label className={'label'}>Номер телефона</label>
                    <ReactSearchAutocomplete
                        items={numbers.map((i:string, index: number) => ({id: index+1, name:i}))}
                        styling={{
                            borderRadius: '12px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '16px',
                            color: '#FFFFFF',
                            backgroundColor: 'rgb(13, 17, 20)',
                            border: 'none',
                            zIndex: 1
                        }}
                        showIcon={false}
                        // onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        // onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                    />
                    <div className={'space-top-24'}/>
                    <InputField
                        label={'Отображаемое название'}
                        control={control}
                        register={register}
                        fieldName={'name'}
                        errors={errors}
                        backgroundLight={false}/>
                    <div className={'space-top-48'}/>
                    <SwitchersRow>
                        <Switcher
                            row={true}
                            label={'СБП'}
                            checked={watch('isAcceptingSbp')}
                            handleSwitch={checked => setValue('isAcceptingSbp', checked)}
                        />
                        <Switcher
                            row={true}
                            label={'Приём платежей'}
                            checked={watch('isAcceptingPayments')}
                            handleSwitch={checked => setValue('isAcceptingPayments', checked)}
                        />
                    </SwitchersRow>
                    <Button
                        variant={'full'}
                        text={'Подключить'}
                        style={{width: '182px', marginTop: '48px'}}
                        type={'submit'}/>
                </form>
            </Modal>
        </MainLayout>
    );
};
