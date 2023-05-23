import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from '../../hooks/app';
import {Button, InputField, SubTitle} from '../../fields';
import {EyeClose, EyeOpen} from '../../icons';
import {signUp} from './store/auth.thunk';
import styles from './styles.module.scss';
import {ISignUpRequest} from './store/types';
import {AuthNavigate} from './components';

const schema = yup.object({
    email: yup.string().email('Не валидный email').required('Обязательное поле'),
    password: yup.string().min(8, 'Минимум 8 символов').required('Обязательное поле'),
    code: yup.string() /*.required('Обязательное поле'),*/
});

export const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {control, register, formState: {errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const handleSignUp = handleSubmit(async (values) => {
        await dispatch(signUp(values as ISignUpRequest));
        navigate('/');
    });

    const renderIcon = () => (
        <div className={styles.formPasswordIcon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOpen color={'#667180'}/> : <EyeClose color={'#667180'}/>}
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSignUp}>
                <SubTitle text={'Регистрация'} style={{textAlign: 'center'}}/>
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
                        label={'Пароль (мин 8 символов)'}
                        control={control}
                        autoComplete={'off'}
                        type={showPassword ? 'text' : 'password'}
                        icon={renderIcon()}
                        register={register}
                        backgroundLight={false}
                        fieldName={'password'}
                        errors={errors}/>
                </div>
                <div className={'box'}>
                    <InputField
                        label={'Код приглашения'}
                        control={control}
                        autoComplete={'off'}
                        register={register}
                        fieldName={'code'}
                        backgroundLight={false}
                        errors={errors}/>
                </div>
                <div className={styles.formButtonWRapper}>
                    <Button variant={'full'} type={'submit'} text={'Создать аккаунт'}/>
                </div>

            </form>
        </div>
    );
};
