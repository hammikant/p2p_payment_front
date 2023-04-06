import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputField} from '../../../fields';
import {useAppDispatch} from '../../../hooks/app';
import {searchByCardNumberPayments} from '../store/payments.thunk';
import styles from './styles.module.scss';

const schema = yup.object({
    cardNumber: yup.string().matches(/^[0-9]+$/, 'Только цифры')
        .min(16, 'Не меньше 16 символов')
        .max(16, 'Не больше 16 символов'),
    bankName: yup.string().matches(/^[0-9]+$/, 'Только цифры')
        .min(4, 'Не меньше 12 символов')
        .max(4, 'Не больше 12 символов'),
});

export const SearchByCardNumber = () => {
    const dispatch = useAppDispatch();
    const {control, register, handleSubmit, watch, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const submit = handleSubmit(values => {
        dispatch(searchByCardNumberPayments({cardNum: values.cardNumber}));
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
                            const value = watch('cardNumber');
                            value !== '' && submit();
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
                    onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                            const value = watch('bankName');
                            value !== '' && submit();
                        }
                    }}
                    backgroundLight={true}/>
            </div>
        </form>
    );
};
