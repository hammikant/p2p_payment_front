import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from '../../hooks/app';
import {Button, InputField, SubTitle} from '../../fields';
import {EyeClose, EyeOpen} from '../../icons';
import styles from './styles.module.scss';
import {AuthNavigate} from './components';
import {signIn} from './store/auth.thunk';
import {ISignInRequest} from './store/types';

const schema = yup.object({
    email: yup.string().email('Не валидный email').required('Обязательное поле'),
    password: yup.string().min(8, 'Минимум 8 символов').required('Обязательное поле'),
});

export const SignIn = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {control, register, formState: {errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const handleSignIn = handleSubmit(async (values) => {
        dispatch(signIn(values as ISignInRequest));
        navigate('/');
    });

    const renderIcon = () => (
        <div className={styles.formPasswordIcon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOpen color={'#667180'}/> : <EyeClose color={'#667180'}/>}
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSignIn}>
                <SubTitle text={'Авторизация'} style={{textAlign: 'center'}}/>
                <AuthNavigate/>
                <div className={'box'}>
                    <InputField
                        label={'Email'}
                        control={control}
                        autoComplete={'off'}
                        register={register}
                        fieldName={'email'}
                        backgroundLight={false}
                        errors={errors}/>
                </div>
                <div className={'box'}>
                    <InputField
                        label={'Пароль'}
                        control={control}
                        autoComplete={'off'}
                        type={showPassword ? 'text' : 'password'}
                        icon={renderIcon()}
                        register={register}
                        fieldName={'password'}
                        backgroundLight={false}
                        errors={errors}/>
                </div>
                <NavLink to={'/forgot-password'} className={styles.forgotPasswordLink}>Забыли пароль?</NavLink>
                <div className={styles.formButtonWRapper}>
                    <Button variant={'full'} type={'submit'} text={'Войти'}/>
                </div>
            </form>
        </div>
    );
};
