import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputField} from '../../../fields';
import styles from './styles.module.scss';

const schema = yup.object({
    cardNumber: yup.number().min(12, 'Минимум 12 чисел'),
    bankName: yup.string()
});

export const SearchByCardNumber = () => {
    const {control, register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <form className={styles.searchByCard}>
            <div className={styles.searchByCardItem}>
                <InputField
                    label={'Карта'}
                    control={control}
                    register={register}
                    fieldName={'cardNumber'}
                    errors={errors}
                    autoComplete={'off'}
                    placeholder={'XXXX XXXX XXXX XXXX'}
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
