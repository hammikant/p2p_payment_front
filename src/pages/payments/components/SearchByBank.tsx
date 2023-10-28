import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch, useAppSelector} from '../../../hooks/app';
import { Select} from '../../../fields';
import {IOption} from '../../../types';
import {IBank} from '../../banks/store/types';
import {getPayments, paymentsFilter} from '../store/payments.thunk';
import {optionsBanksList} from '../../../utils/constants';

const schema = yup.object({
    id: yup.string()
});

export const SearchByBank = () => {
    const dispatch = useAppDispatch();

    const {control, register, watch, setValue, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const submit = handleSubmit(values => {
        if(values.id !== 'all') {
           dispatch(paymentsFilter({params: `bank=${values.id}`}));
        } else {
          dispatch(getPayments());
        }
    });

    return (
        <Select
            label={'Банк'}
            control={control}
            register={register}
            fieldName={'id'}
            errors={errors}
            watch={watch}
            setValue={setValue}
            options={[...optionsBanksList ]}
            onChangeItem={() => submit()}
            style={{
                backgroundColor: 'rgb(27, 31, 38)'
            }}
        />
    );
};
