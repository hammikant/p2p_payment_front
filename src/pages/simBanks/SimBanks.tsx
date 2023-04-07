import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {MainLayout} from '../../layouts';
import {Button, InputField, SubTitle} from '../../fields';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {Modal} from '../../components/modal';
import {Close} from '../../icons';
import {SimBankTable} from './componetns';
import {ISimBank} from './store/types';
import {addSimBank, getSimBanks} from './store/simBanks.thunk';
import styles from './styles.module.scss';

const schema = yup.object({
    name: yup.string().max(25, 'Максимум 25 символов').required('Обязательное поле'),
    apiKey: yup.string().required('Обязательное поле')
});

export const SimBanks = () => {
    const dispatch = useAppDispatch();
    const {list, meta, loading} = useAppSelector(state => state.simBanks);
    const [connectionModal, setConnectModal] = useState<boolean>(false);

    const {control, register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        dispatch(getSimBanks());
    }, []);

    const submit = handleSubmit(values => {
        dispatch(addSimBank(values as { name: string, apiKey: string }));
        setConnectModal(false);
    });

    return (
        <MainLayout titlePage={'SIM-Банки'} descriptionPage={'Какое-то небольшое описание раздела'}>
            <Button text={'Добавить SIM-Банк'} variant={'outline'} onClick={() => setConnectModal(true)}/>
            <div className={'space-top-32'}/>
            <div className={styles.simBankContent}>
                {list.map((bank: ISimBank) =>
                    <SimBankTable
                        key={bank.id}
                        name={bank.name}
                        id={bank.id}
                        confirmationCode={bank.confirmationCode}
                        redirectMail={bank.redirectMail}
                        create_as={bank.create_as}
                        cellPhones={bank.cellPhones}
                    />)}
            </div>
            <Modal
                show={connectionModal}
                widthContent={'472px'}
                backgroundColorOverlay={'rgba(13,17,20,0.57)'}
                handleClickOverlay={() => setConnectModal(false)}
            >
                <span
                    className={'closeIcon'}
                    onClick={() => setConnectModal(false)}>
                    <Close
                        color={'#667180'}
                        height={'32'}
                        width={'32'}/>
                </span>
                <SubTitle text={'Добавить SIM-Банк'}/>
                <div className={'space-top-32'}/>
                <form onSubmit={submit}>
                    <InputField
                        label={'Название SIM-Банка'}
                        control={control}
                        register={register}
                        fieldName={'name'}
                        errors={errors}
                        backgroundLight={false}
                    />
                    <div className={'space-top-24'}/>
                    <InputField
                        label={'Ваш API-ключ'}
                        control={control}
                        register={register}
                        fieldName={'apiKey'}
                        errors={errors}
                        backgroundLight={false}
                    />
                    <div className={'space-top-32'}/>
                    <Button
                        text={'Добавить'}
                        variant={'full'}
                        style={{width: '148px'}}
                        type={'submit'}
                    />
                </form>
            </Modal>
        </MainLayout>
    );
};
