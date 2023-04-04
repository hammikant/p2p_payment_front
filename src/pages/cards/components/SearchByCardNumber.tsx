import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputField} from '../../../fields';
import {searchByCardNumber} from '../store/cards.thunk';
import {useAppDispatch} from '../../../hooks/app';
import styles from './styles.module.scss';

const schema = yup.object({
    cardNumber: yup.number().min(12, 'Минимум 12 чисел'),
    bankName: yup.string()
});

export const SearchByCardNumber = () => {
    const dispatch = useAppDispatch();
    const {control, register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const submit = handleSubmit(values => {
        dispatch(searchByCardNumber({cardNum: values.cardNumber}));
    });

    return (
        <form className={styles.searchByCard} onSubmit={submit}>
            <div className={styles.searchByCardItem}>
                <InputField
                    label={'Карта'}
                    control={control}
                    register={register}
                    fieldName={'cardNumber'}
                    errors={errors}
                    autoComplete={'off'}
                    placeholder={'XXXX XXXX XXXX XXXX'}
                    onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                            submit();
                        }
                    }}
                    backgroundLight={true}/>
            </div>
            <div className={styles.searchByCardItem}>
                <InputField
                    label={'Банк'}
                    control={control}
                    register={register}
                    fieldName={'bankName'}
                    autoComplete={'off'}
                    errors={errors}
                    placeholder={'XXXX'}
                    backgroundLight={true}/>
            </div>
        </form>
    );
};
