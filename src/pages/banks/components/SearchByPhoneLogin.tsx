import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputField} from '../../../fields';
import {useAppDispatch} from '../../../hooks/app';
import styles from './styles.module.scss';

const schema = yup.object({
    cellPhone: yup.string().matches(/^[0-9]+$/, 'Только цифры')
        .min(11, 'Не меньше 1 символов')
        .max(11, 'Не больше 1 символов'),
    bankName: yup.string().matches(/^[0-9]+$/, 'Только цифры')
        .min(4, 'Не меньше 4 символов')
        .max(4, 'Не больше 4 символов'),
});

export const SearchByPhoneLogin = () => {
    const dispatch = useAppDispatch();
    const {control, register, watch, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const submit = handleSubmit(values => {
    });

    return (
        <form className={styles.searchByCard} onSubmit={submit}>
            <div className={styles.searchByCardItem}>
                <InputField
                    label={'Номер телефона (логин)'}
                    control={control}
                    register={register}
                    fieldName={'cellPhone'}
                    errors={errors}
                    autoComplete={'off'}
                    placeholder={''}
                    onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                            const value = watch('cellPhone');
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
                    placeholder={''}
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
