import React from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {optionsBanksList} from '../utils/constants';
import {SearchByBankProps} from '../types';
import {Select} from './Select';

const schema = yup.object({
    id: yup.string()
});

export const SearchByBank = ({handleBankFilter}:SearchByBankProps) => {

    const {control, register, watch, setValue, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const submit = handleSubmit(values => {
        handleBankFilter(`${values.id}`);
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
            options={[...optionsBanksList]}
            onChangeItem={() => submit()}
            style={{
                backgroundColor: 'rgb(27, 31, 38)'
            }}
        />
    );
};
