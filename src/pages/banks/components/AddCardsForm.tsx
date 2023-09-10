import React from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {string} from 'yup';
import {BankNames} from '../../../types';
import {Button, TextareaField} from '../../../fields';
import {useAppDispatch} from '../../../hooks/app';
import {IConnectCard} from '../../cards/store/types';
import {connectCardsInBank} from '../store/banks.thunk';

const schema = yup.object({
    cardNumbers: yup.string().required('Поле не может быть пустым')
});

const schemaSber = yup.object({
    cardNumbers: yup.string().required('Поле не может быть пустым')
});

interface IAddCardsFormProps {
    bankName: BankNames;
    handleClose: () => void;
    id: number;
}

export const AddCardsForm = ({bankName, handleClose, id}: IAddCardsFormProps) => {
    const dispatch = useAppDispatch();
    const {control, register, formState: {errors}, handleSubmit} = useForm({
        resolver: yupResolver(bankName === BankNames.sber ? schemaSber : schema)
    });

    const submit = handleSubmit(values => {
        const cards = values.cardNumbers.split(',')
            .map((s: string) => s.replaceAll(' ', ''))
            .map((s:string) => s.replaceAll('-', ''));
        dispatch(connectCardsInBank({cardNumbers : cards, bankAccountId: id} as IConnectCard));
        handleClose();
    });

    return (
        <>
            <TextareaField
                control={control}
                register={register}
                fieldName={'cardNumbers'}
                errors={errors}
                backgroundLight={false}
                rows={10}
            />
            <div className={'space-top-24'}/>
            <Button
                text={'Подключить'}
                variant={'full'}
                style={{width: '182px'}}
                onClick={submit}
            />
        </>
    );
};
