import React from 'react';
import {NavLink} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {Button, InputField, SubTitle} from '../../fields';
import {Modal} from '../../components/modal';
import styles from './styles.module.scss';
import {clearForgotModal} from './store/auth.slice';
import {forgotPassword} from './store/auth.thunk';

const schema = yup.object({
    login: yup.string().email('Не валидный email').required('Обязательное поле'),
});

export const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const {sendEmailForgotPassword, successForgot} = useAppSelector(state => state.auth);

    const {control, register, formState: {errors}, handleSubmit, reset} = useForm({
        resolver: yupResolver(schema)
    });

    const handleSignIn = handleSubmit(async (values) => {
        dispatch(forgotPassword({login: values.login as string}));
        reset();
    });

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSignIn}>
                <SubTitle text={'Восстановление доступа'}/>
                <div className={'space-top-32'}/>
                <InputField
                    label={'Email'}
                    control={control}
                    autoComplete={'off'}
                    register={register}
                    fieldName={'login'}
                    backgroundLight={false}
                    errors={errors}/>
                <div className={styles.formButtonWRapper}>
                    <Button type={'submit'} text={'Восстановить доступ'}/>
                </div>
                <NavLink to={'/login'} className={styles.forgotAuthorizationLink}>Авторизация</NavLink>
            </form>
            <Modal
                widthContent={'472px'}
                show={successForgot}
                handleClickOverlay={() => dispatch(clearForgotModal())}>
                <div>
                    <SubTitle text={'Проверьте почту'}/>
                    <p className={styles.forgotSuccessText}>
                        Мы отправили ссылку для смены пароля на <span>{sendEmailForgotPassword}</span>. Если вы не
                        можете найти
                        письмо, возможно оно попало в папку спама
                    </p>
                </div>
            </Modal>
        </div>
    );
};
