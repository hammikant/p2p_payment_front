import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {MainLayout} from '../../layouts';
import {Modal} from '../../components/modal';
import {Button, InputField, Select, SubTitle, Switcher} from '../../fields';
import {Close} from '../../icons';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {IOption} from '../../types';
import {TabsButtons} from '../../components/tabsButtons';
import styles from './styles.module.scss';
import {addBank, getBanks} from './store/banks.thunk';
import {IBank} from './store/types';
import {BankCards} from './components/BankCards';
import {SearchByPhoneLogin, SwitchersRow} from './components';

const buttons: IOption[] = [
    {label: 'Все', value: 'all'},
    {label: 'Активный', value: 'active'},
    {label: 'Не активный', value: 'inactive'},
    {label: 'На паузе', value: 'pause'},
    {label: 'Отключена', value: 'disabled'},
];

const schema = yup.object({
    bankName: yup.string().required('Обязательное поле'),
    simBankCellPhone: yup.string().required('Обязательное поле'),
    name: yup.string().max(25, 'Максимум 25 символов').required('Обязательное поле'),
    acceptingPayments: yup.boolean().default(false),
    spb: yup.boolean().default(false),
});

export const Banks = () => {
    const dispatch = useAppDispatch();
    const {bankNames, simBanksCellPhones} = useAppSelector(state => state.app.commonData);
    const {list, loading} = useAppSelector(state => state.banks);
    const [connectModal, setConnectModal] = useState<boolean>(false);
    const [currentTab, setCurrentTab] = useState<IOption>({label: buttons[0].label, value: buttons[0].value});

    useEffect(() => {
        dispatch(getBanks({status: currentTab.value}));
    }, []);

    const {control, register, setValue, watch, formState: {errors}, reset, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const handleTabs = (item: IOption) => {
        //@todo здесь происходит запрос по табуляции status - all, active, inactive, pause, disabled
        setCurrentTab(item);
        dispatch(getBanks({status: item.value}));
    };

    const submit = handleSubmit(values => {
        dispatch(addBank({bank: {...values, verification: false} as IBank}));
        reset();
        setConnectModal(false);
    });

    return (
        <MainLayout titlePage={'Банки'} descriptionPage={'На эти карты мы будем переводить деньги с вашего баланса'}>
            <button className={styles.connectBankButton} onClick={() => setConnectModal(true)}>Подключить карту</button>
            <div className={'space-top-32'}/>
            <SearchByPhoneLogin/>
            <div className={'space-top-32'}/>
            <TabsButtons items={buttons} selected={currentTab} handleClick={item => handleTabs(item)}/>
            <div className={'space-top-24'}/>
            {loading ? <p style={{color: '#ffffff'}}>Loading...</p> : (
                <BankCards items={list}/>
            )}

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
                        fieldName={'bankName'}
                        errors={errors}
                        watch={watch}
                        options={bankNames}
                        setValue={setValue}/>
                    <div className={'space-top-24'}/>
                    <Select
                        label={'Телефон'}
                        control={control}
                        register={register}
                        fieldName={'simBankCellPhone'}
                        errors={errors}
                        watch={watch}
                        options={simBanksCellPhones}
                        setValue={setValue}/>
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
                            checked={watch('spb')}
                            handleSwitch={checked => setValue('spb', checked)}
                        />
                        <Switcher
                            row={true}
                            label={'Приём платежей'}
                            checked={watch('acceptingPayments')}
                            handleSwitch={checked => setValue('acceptingPayments', checked)}
                        />
                    </SwitchersRow>
                    <Button text={'Подключить'} style={{width: '182px', marginTop: '48px'}} type={'submit'}/>
                </form>
            </Modal>
        </MainLayout>
    );
};
