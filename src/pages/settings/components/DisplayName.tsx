import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputField} from '../../../fields';
import {useAppDispatch, useAppSelector} from '../../../hooks/app';
import {changeDisplayName} from '../../auth/store/auth.thunk';
import styles from './styles.module.scss';

const schema = yup.object({
    displayName: yup.string().required('Поле не может быть пустым')
});

export const DisplayName = ({displayName}:{displayName:string}) => {
    const dispatch = useAppDispatch();

    const {control, register, handleSubmit, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        setValue('displayName', displayName);
    }, [displayName]);

    const submit = handleSubmit(values => {
        dispatch(changeDisplayName({displayName: values.displayName}));
    });
    return (
        <form className={styles.displayName} onSubmit={submit}>
            <div className={styles.displayNameCol}>
                <InputField
                    control={control}
                    register={register}
                    fieldName={'displayName'}
                    errors={errors}
                    autoComplete={'off'}
                    backgroundLight={true}/>
            </div>
            <div className={styles.displayNameCol}>
                <button className={styles.displayNameButton}>Сохранить</button>
            </div>
        </form>
    );
};
