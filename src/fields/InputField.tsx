import {ErrorMessage} from '@hookform/error-message';
import React from 'react';
import {Controller} from 'react-hook-form';
import styles from './styles.module.scss';
import {IInput} from './types';

export const InputField = (
    {
        label,
        control,
        register,
        fieldName,
        errors,
        onFocus,
        onBlur
    }: IInput) => {
    return (
        <Controller
            control={control}
            name={fieldName}
            render={({field: {name}, fieldState: {error}}) => (
                <>
                    <label className={styles.label}>{label}</label>
                    <input
                        {...register(name)}
                        className={styles.input}
                        onBlur={onBlur}
                        onFocus={onFocus}
                    />
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({message}: { message: string }) => <p className={styles.errorText}>{message}</p>}
                    />
                </>
            )}/>
    );
};
