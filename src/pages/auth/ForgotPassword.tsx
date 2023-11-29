import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
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
    const navigate = useNavigate();
    const {successForgot} = useAppSelector(state => state.auth);

    const {control, register, formState: {errors}, handleSubmit, reset} = useForm({
        resolver: yupResolver(schema)
    });

    const handleSignIn = handleSubmit(async (values) => {
        dispatch(forgotPassword({email: values.login as string}));
        reset();
    });

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSignIn}>
                <SubTitle text={'Восстановление доступа'} style={{textAlign: 'center'}}/>
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
                    <Button variant={'full'} type={'submit'} text={'Восстановить доступ'}/>
                </div>
                <NavLink to={'/login'} className={styles.forgotAuthorizationLink}>Авторизация</NavLink>
            </form>
            <Modal
                widthContent={'472px'}
                show={successForgot}
                backgroundColorOverlay={'#0D1114'}
                handleClickOverlay={() => {
                    dispatch(clearForgotModal());
                    navigate('/login');
                }}>
                <div>
                    <SubTitle text={'Проверьте почту'} style={{textAlign: 'center'}}/>
                    <p className={styles.forgotSuccessText}>
                        Мы отправили ссылку для смены пароля. Если вы не
                        можете найти
                        письмо, возможно оно попало в папку спам.
                    </p>
                </div>
            </Modal>
        </div>
    );
};
