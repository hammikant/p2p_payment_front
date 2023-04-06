import React, {useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import classNames from 'classnames';
import {Button, InputField, SubTitle, Switcher} from '../../../fields';
import {IBank} from '../store/types';
import {viewBankNames} from '../../../utils';
import {Delete} from '../../../icons';
import {useAppDispatch} from '../../../hooks/app';
import {deleteBank, updateBank} from '../store/banks.thunk';
import styles from './styles.module.scss';
import {SwitchersRow} from './SwitchersRow';

export const SettingsForm = ({item}: { item: IBank }) => {
    const dispatch = useAppDispatch();
    const {control, register, setValue, watch, handleSubmit, formState: {errors}} = useFormContext();

    useEffect(() => {
        setValue('name', item.name);
        setValue('spb', item.spb);
        setValue('acceptingPayments', item.acceptingPayments);
    }, []);

    const submit = handleSubmit(values => {
        dispatch(updateBank({bank: {...item, ...values}}));
    });

    const handleDeleteBank = () => {
        dispatch(deleteBank({id: item.id}));
    };

    return (
        <>
            <SubTitle text={'Настройки банка'}/>
            <p className={styles.bankModalTextG}>Добавлен: {item.create_as}</p>
            <p className={styles.bankModalTextG}>ID: {item.id}</p>
            <div className={'space-top-24'}/>
            <form>
                <InputField
                    control={control}
                    register={register}
                    fieldName={'name'}
                    autoComplete={'off'}
                    errors={errors}
                    backgroundLight={false}/>
                <div className={'space-top-32'}/>
                <ul className={classNames(styles.bankModalList, styles.bankModalListTransparentBg)}>
                    <li className={styles.bankModalListItem}>
                        <span className={styles.bankModalListText}>Банк:</span>
                        <span className={styles.bankModalListText}>{viewBankNames[item.bankName]}</span>
                    </li>
                    <li className={styles.bankModalListItem}>
                        <span className={styles.bankModalListText}>Номер:</span>
                        <span className={styles.bankModalListText}>{item.simBankCellPhone}</span>
                    </li>
                    <li className={styles.bankModalListItem}>
                        <span className={styles.bankModalListText}>Проверка:</span>
                        <span className={styles.bankModalListText}>авторизован</span>
                    </li>
                    <li className={styles.bankModalListItem}>
                        <span className={styles.bankModalListText}>Транзакции:</span>
                        <span className={styles.bankModalListText}>нет</span>
                    </li>
                    <li className={styles.bankModalListItem}>
                        <span className={styles.bankModalListText}>Карты:</span>
                        <span
                            className={styles.bankModalListText}>{item.cards !== null ? item.cards : 'не подключены'}</span>
                    </li>
                </ul>
                <div className={'space-top-32'}/>
                <SwitchersRow>
                    <Switcher
                        row={true}
                        label={'СБП'}
                        checked={watch('spb')}
                        handleSwitch={checked => setValue('spb', checked)}
                    />
                    <Switcher
                        row={true}
                        label={'Приём платежей'}
                        checked={watch('acceptingPayments')}
                        handleSwitch={checked => setValue('acceptingPayments', checked)}
                    />
                </SwitchersRow>
                <div className={'space-top-48'}/>
                <div className={styles.bankModalButtons}>
                    <Button
                        text={'Сохранить'}
                        style={{width: '154px'}}
                        type={'submit'}
                        onClick={submit}/>
                    <button className={styles.bankModalDelete} type={'button'} onClick={handleDeleteBank}>
                        <Delete/> Удалить банк
                    </button>
                </div>
            </form>
        </>
    );
};
