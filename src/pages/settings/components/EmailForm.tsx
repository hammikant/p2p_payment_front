import React, {useState} from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import ReactCodeInput from 'react-verification-code-input';
import {Button, InputField, SubTitle} from '../../../fields';
import {useAppDispatch} from '../../../hooks/app';
import {changeEmail, confirmEmail} from '../../auth/store/auth.thunk';
import styles from './styles.module.scss';

const schema = yup.object({
    email: yup.string().email('Не валидный email').required('Обязательное поле'),
});

export const EmailForm = ({handleCansel}: { handleCansel: () => void }) => {
    const dispatch = useAppDispatch();
    const [isConfirm, setConfirm] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const {control, register, formState: {errors}, reset, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const submitEmail = handleSubmit(values => {
        setConfirm(true);
        setEmail(values.email);
        dispatch(changeEmail({email: values.email}));
    });

    const handleConfirmEmail = (val: string) => {
        dispatch(confirmEmail({code: val, email}));
    };

    const handleResend = () => {
        dispatch(changeEmail({email}));
    };

    if (isConfirm) {
        return (
            <>
                <SubTitle text={'Смена Email'} style={{textAlign: 'center'}}/>
                <div className={'space-top-24'}/>
                <p className={'text-16'} style={{textAlign: 'center'}}>Введите проверочный код, который был отправлен на
                    ваш текущий Email:</p>
                <div className={'space-top-24'}/>
                <ReactCodeInput
                    fields={4}
                    type={'number'}
                    autoFocus={true}
                    className={styles.codeInput}
                    fieldWidth={60}
                    fieldHeight={97}
                    onComplete={handleConfirmEmail}
                />
                <button className={styles.resendEmail} onClick={handleResend}>Отправить повторно</button>
            </>
        );
    }

    return (
        <form>
            <SubTitle text={'Смена Email'} style={{textAlign: 'center'}}/>
            <div className={'space-top-24'}/>
            <p className={'text-16'} style={{textAlign: 'center'}}>Введите новый Email, который будет использоваться
                для входа в аккаунт и
                восстановления пароля</p>
            <div className={'space-top-24'}/>
            <InputField
                control={control}
                register={register}
                fieldName={'email'}
                errors={errors}
                autoComplete={'off'}
                backgroundLight={false}
            />
            <div className={styles.emailModalButtons}>
                <Button
                    text={'Изменить'}
                    variant={'full'}
                    type={'submit'}
                    style={{width: '164px'}}
                    onClick={submitEmail}
                />
                <Button
                    text={'Отмена'}
                    variant={'outline'}
                    style={{width: '164px'}}
                    type={'button'}
                    onClick={() => {
                        reset();
                        handleCansel();
                    }}/>
            </div>
        </form>
    );
};
