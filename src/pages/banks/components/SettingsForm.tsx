import React, {useEffect, useMemo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import classNames from 'classnames';
import {useNavigate} from 'react-router-dom';
import {Button, InputField, SubTitle, Switcher} from '../../../fields';
import {IBank} from '../store/types';
import {viewBankNames} from '../../../utils';
import {Close, Delete} from '../../../icons';
import {useAppDispatch} from '../../../hooks/app';
import {deleteBank, updateBank} from '../store/banks.thunk';
import {Modal} from '../../../components/modal';
import styles from './styles.module.scss';
import {SwitchersRow} from './SwitchersRow';
import {AddCardsForm} from './AddCardsForm';

export const SettingsForm = ({item, handleCloseModal}: { item: IBank, handleCloseModal: () => void; }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {control, register, setValue, watch, handleSubmit, formState: {errors}} = useFormContext();
    const [isAddedCard, setAddedCard] = useState<boolean>(false);

    useEffect(() => {
        setValue('name', item.name);
        setValue('isAcceptingSbp', item.isAcceptingSbp);
        setValue('isAcceptingPayments', item.isAcceptingPayments);
    }, []);

    const submit = handleSubmit(values => {
        dispatch(updateBank({bank: {...item, ...values}}));
        handleCloseModal();
    });

    const handleDeleteBank = () => {
        dispatch(deleteBank({id: item.id}));
    };

    const renderNumCards = useMemo(() => (
        <span
            className={
                classNames(
                    styles.bankModalListText
                )}>{item.cards}</span>
    ), [item]);

    return (
        <>
            <SubTitle text={'Настройки банка'}/>
            {/*<p className={styles.bankModalTextG}>Добавлен: {'нет даты'}</p>*/}
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
                        <span className={styles.bankModalListText}>{viewBankNames[item.bank]}</span>
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
                        <span
                            className={
                                classNames(
                                    styles.bankModalListText,
                                    styles.bankModalListTextButtonType
                                )}
                            onClick={() => navigate('/cards', {state: {id: item.id}})}
                        >Карты:</span>
                        <span
                            className={styles.bankModalListText}
                            onClick={() => setAddedCard(true)}>
                            {renderNumCards}
                            <span
                                className={
                                    classNames(
                                        styles.bankModalListText,
                                        styles.bankModalListTextButtonType,
                                        styles.bankModalListTextGreen)}>подключить</span>
                        </span>
                    </li>
                </ul>
                <div className={'space-top-32'}/>
                <SwitchersRow>
                    <Switcher
                        row={true}
                        label={'СБП'}
                        checked={watch('isAcceptingSbp')}
                        handleSwitch={checked => setValue('isAcceptingSbp', checked)}
                    />
                    <Switcher
                        row={true}
                        label={'Приём платежей'}
                        checked={watch('isAcceptingPayments')}
                        handleSwitch={checked => setValue('isAcceptingPayments', checked)}
                    />
                </SwitchersRow>
                <div className={'space-top-48'}/>
                <div className={styles.bankModalButtons}>
                    <Button
                        variant={'full'}
                        text={'Сохранить'}
                        style={{width: '154px'}}
                        type={'submit'}
                        onClick={submit}/>
                    <button className={styles.bankModalDelete} type={'button'} onClick={handleDeleteBank}>
                        <Delete/> Удалить банк
                    </button>
                </div>
            </form>
            <Modal
                show={isAddedCard}
                widthContent={'472px'}
                backgroundColorOverlay={'rgba(13,17,20,0.57)'}
                handleClickOverlay={() => setAddedCard(false)}
            >
                <span
                    className={'closeIcon'}
                    onClick={() => setAddedCard(false)}>
                    <Close
                        color={'#667180'}
                        height={'32'}
                        width={'32'}/>
                </span>
                <SubTitle text={'Подключить карты'}/>
                <div className={'space-top-32'}/>
                <p className={'text-16'}>Чтобы добавить несколько карт, вставьте их списком через запятую. Можно добавить до 100 карт одновременно.</p>
                <AddCardsForm
                    id={item.id}
                    bankName={item.bank}
                    handleClose={() => setAddedCard(false)}
                />
            </Modal>
        </>
    );
};
