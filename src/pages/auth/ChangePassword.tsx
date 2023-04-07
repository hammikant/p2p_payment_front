import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from '../../hooks/app';
import {Button, InputField, SubTitle} from '../../fields';
import {EyeClose, EyeOpen} from '../../icons';
import styles from './styles.module.scss';
import {changePassword} from './store/auth.thunk';

const schema = yup.object({
    password: yup.string().min(8, 'Минимум 8 символов').required('Обязательное поле'),
    confirmPassword: yup.string()
        .required('Подтверждение обязательно')
        .min(8, 'Минимум 8 символов')
        .oneOf([yup.ref('password')], 'Пароли не совпадают')
});

export const ChangePassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const {control, register, formState: {errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const handleSignIn = handleSubmit(async (values) => {
        dispatch(changePassword({password: values.password as string}));
        navigate('/');
    });

    const renderIcon = () => (
        <div className={styles.formPasswordIcon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOpen color={'#667180'}/> : <EyeClose color={'#667180'}/>}
        </div>
    );
    const renderIcon2 = () => (
        <div className={styles.formPasswordIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeOpen color={'#667180'}/> : <EyeClose color={'#667180'}/>}
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSignIn}>
                <SubTitle text={'Смена пароля'} style={{textAlign: 'center'}}/>
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
                        label={'Подтвердите пароль'}
                        control={control}
                        autoComplete={'off'}
                        type={showConfirmPassword ? 'text' : 'password'}
                        icon={renderIcon2()}
                        register={register}
                        backgroundLight={false}
                        fieldName={'confirmPassword'}
                        errors={errors}/>
                </div>
                <div className={styles.formButtonWRapper}>
                    <Button variant={'full'} type={'submit'} text={'Сменить пароль'}/>
                </div>
            </form>
        </div>
    );
};
