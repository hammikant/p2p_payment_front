import React from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from '../../../hooks/app';
import {cardsFilter, getCards} from '../store/cards.thunk';
import {InputField} from '../../../fields';
import {SearchByBankProps, SearchByInputProps} from '../../../types';
import {formatCardNumber} from '../../../utils';

const schema = yup.object({
    number: yup.string() //.matches(/^[0-9]+$/, 'Только цифры')
        .max(19, 'Не больше 16 символов'),
});
export const SearchByCardNum = ({handleInputFilter}:SearchByInputProps) => {
    const {control, register, watch, setValue, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const submit = handleSubmit(values => {
        if(values.hasOwnProperty('number')){
            handleInputFilter(values.number.replaceAll(' ', ''));
        } else {
            handleInputFilter('');
        }
    });

    return (
        <InputField
            label={'Карта'}
            control={control}
            register={register}
            fieldName={'number'}
            //type={'number'}
            errors={errors}
            maxLength={19}
            autoComplete={'off'}
            placeholder={'XXXX XXXX XXXX XXXX'}
            onChange={e => {
                const value = formatCardNumber(e.target.value);
                setValue('number', value);
                if(!value) {
                    submit();
                }
            }}
            onKeyDown={async (e) => {
                if(e.code === 'Enter') {
                    const value = watch('number');
                    if(value.length < 19) return;
                    if(value !== '') {
                        await submit();
                    }
                }
            }}
            backgroundLight={true}/>
    );
};
