import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from '../../hooks/app';
import {Button, InputField} from '../../fields';
import {signIn} from './store/auth.thunk';
import styles from './styles.module.scss';
import {ISignUpRequest} from './store/types';

const schema = yup.object({
    login: yup.string().email().required('Обязательное поле'),
    password: yup.string().min(8, 'Минимум 8 символов').required('Обязательное поле'),
    //code: yup.string().required('Обязательное поле'),
});

export const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {control, register, formState: {errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const handleSignIn = handleSubmit(async (values) => {
        await dispatch(signIn(values as ISignUpRequest));
        navigate('/');
    });

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSignIn}>
                <div className={'box'}>
                    <InputField label={'Email'} control={control} register={register} fieldName={'login'}
                                errors={errors}/>
                </div>
                <div className={'box'}>
                    <InputField label={'Пароль (мин 8 символов)'} control={control} register={register}
                                fieldName={'password'}
                                errors={errors}/>
                </div>
                <div className={styles.formButtonWRapper}>
                    <Button type={'submit'} text={'Создать аккаунт'}/>
                </div>

            </form>
        </div>
    );
};
