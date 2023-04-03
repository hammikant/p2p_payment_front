import React from 'react';
import {Controller} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import styles from './styles.module.scss';
import {ITextarea} from './types';

export const TextareaField = (
    {
        label,
        control,
        icon,
        register,
        fieldName,
        errors,
        placeholder,
        backgroundLight,
        ...props
    }: ITextarea) => {
    return (
        <Controller
            control={control}
            name={fieldName}
            render={({field: {name}, fieldState: {error}}) => (
                <div className={styles.inputWrapper}>
                    <label className={styles.label}>{label}</label>
                    <textarea
                        {...register(name)}
                        {...props}
                        className={styles.input}
                        placeholder={placeholder}
                        style={{backgroundColor: backgroundLight ? '#1B1F26' : '#0D1114'}}
                    />
                    {icon ? <span className={styles.icon}>{icon}</span> : null}
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({message}: { message: string }) => <p className={styles.errorText}>{message}</p>}
                    />
                </div>
            )}/>
    );
};
