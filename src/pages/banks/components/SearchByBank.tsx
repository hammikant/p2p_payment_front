import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch, useAppSelector} from '../../../hooks/app';
import { Select} from '../../../fields';
import {IOption} from '../../../types';
import {IBank} from '../store/types';
import {banksFilter, getBanks} from '../store/banks.thunk';

const schema = yup.object({
    id: yup.string()
});

export const SearchByBank = () => {
    const dispatch = useAppDispatch();
    const {list} = useAppSelector(state => state.banks);
    const [option, setOption] = useState<IOption[]>([]);

    useEffect(() => {
        const opt = list.map((item: IBank) => {
            return {
                value: item.id,
                label: item.name
            };
        });
        setOption([...opt, {value: 'all', label: 'Все'}]);
    }, [list]);

    const {control, register, watch, setValue, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const submit = handleSubmit(values => {
        if(values.id !== 'all') {
          dispatch(banksFilter({params: `bankAccountId=${values.id}`}));
        } else {
           dispatch(getBanks());
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
            options={option}
            onChangeItem={() => submit()}
            style={{
                backgroundColor: 'rgb(27, 31, 38)'
            }}
        />
    );
};
