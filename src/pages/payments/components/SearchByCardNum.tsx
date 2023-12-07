import React, {useEffect} from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from '../../../hooks/app';
import {InputField} from '../../../fields';
import {getPayments, paymentsFilter} from '../store/payments.thunk';

const schema = yup.object({
    number: yup.string().matches(/^[0-9]+$/, 'Только цифры')
        .min(16, 'Не меньше 16 символов')
        .max(16, 'Не больше 16 символов'),
});

interface SearchByCardNumProps {
    handleFilterByCard: (params: string) => void;
}

export const SearchByCardNum = ({handleFilterByCard}:SearchByCardNumProps) => {
    const dispatch = useAppDispatch();
    const {control, register, watch, setValue, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });


    const submit = handleSubmit(values => {
        // if(values.number !== '') {
            handleFilterByCard(values.number.replaceAll(' ', ''));
           //dispatch(paymentsFilter({params: `number=${values.number.replaceAll(' ', '')}`}));
        // } else {
        //     dispatch(getPayments());
        // }
    });

    return (
        <InputField
            label={'Карта'}
            control={control}
            register={register}
            fieldName={'number'}
            errors={errors}
            autoComplete={'off'}
            placeholder={'XXXX XXXX XXXX XXXX'}
            onPaste={async (e) => {
                e.preventDefault();
                const data = e.clipboardData.getData('text');
                await setValue('number', data.replaceAll(' ', ''));
                await submit();
            }}
            onKeyDown={(e: any) => {
                if (e.key === 'Enter') {
                    const value = watch('number');
                    value !== '' && submit();
                }
            }}
            backgroundLight={true}/>
    );
};
