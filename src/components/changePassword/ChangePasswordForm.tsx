import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from '../../hooks/app';
import {Button, InputField, SubTitle} from '../../fields';
import {EyeClose, EyeOpen} from '../../icons';
import {changePassword} from '../../pages/auth/store/auth.thunk';
import styles from './styles.module.scss';

const schema = yup.object({
    newPassword: yup.string().min(8, 'Минимум 8 символов').required('Обязательное поле'),
    confirmPassword: yup.string()
        .required('Подтверждение обязательно')
        .min(8, 'Минимум 8 символов')
        .oneOf([yup.ref('newPassword')], 'Пароли не совпадают')
});


export const ChangePasswordForm = ({handleCancel}: { handleCancel: () => void; }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const {control, register, formState: {errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const handleSignIn = handleSubmit(async (values) => {
        dispatch(changePassword({newPassword: values.newPassword as string}));
        handleCancel();
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
        <form className={styles.form} onSubmit={handleSignIn}>
            <SubTitle text={'Смена пароля'} style={{textAlign: 'center'}}/>
            <div className={'space-top-32'}/>
            <div className={'box'}>
                <InputField
                    label={'Пароль (мин 8 символов)'}
                    control={control}
                    autoComplete={'off'}
                    type={showPassword ? 'text' : 'password'}
                    icon={renderIcon()}
                    register={register}
                    backgroundLight={false}
                    fieldName={'newPassword'}
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
                <Button
                    variant={'full'}
                    type={'submit'}
                    text={'Изменить'}
                    style={{width: '164px'}}/>
                <Button
                    variant={'outline'}
                    type={'button'}
                    text={'Отмена'}
                    style={{width: '164px'}}
                    onClick={handleCancel}
                />
            </div>
        </form>
    );
};
