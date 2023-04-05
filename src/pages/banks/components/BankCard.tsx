import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {IBank} from '../store/types';
import gazprom from '../../../assets/images/gazprom.png';
import raiffeisen from '../../../assets/images/raiffeisen.png';
import akbars from '../../../assets/images/akbars.png';
import vtb from '../../../assets/images/vtb.png';
import tinkoff from '../../../assets/images/tinkoff.png';
import alfa from '../../../assets/images/alfa.png';
import sber from '../../../assets/images/sber.png';
import sbp from '../../../assets/images/sbp.png';
import {Modal} from '../../../components/modal';
import {Close} from '../../../icons';
import {InputField, SubTitle} from '../../../fields';
import styles from './styles.module.scss';

const icons: { [key: string]: string } = {
    gazprom,
    raiffeisen,
    akbars,
    vtb,
    tinkoff,
    alfa,
    sber,
    sbp
};

interface IBankCardProps {
    item: IBank;
    handlePressCard: (item: IBank) => void;
}

const schema = yup.object({
    name: yup.string()
});

export const BankCard = ({item, handlePressCard}: IBankCardProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const {control, register, handleSubmit, setValue, formState: {errors}} = useForm();

    const handleSelect = () => {
        if (item.verification)
            setShowModal(true);
        setValue('name', item.name);
    };

    return (
        <div className={styles.col}>
            <div className={styles.bankCard} onClick={handleSelect}>
                <div className={styles.bankCardHeader}>
                    <img src={icons[item.bankName]} className={styles.bankCardLogo} alt={item.bankName}/>
                    <h3 className={styles.bankCardTitle}>{item.name}</h3>
                </div>
                <ul className={styles.bankCardList}>
                    <li className={styles.bankCardListItem}>
                        <span className={styles.bankCardListText}>Карты:</span>
                        <span
                            className={styles.bankCardListText}>{item.cards ? item.cards : 'не подключены'}</span>
                    </li>
                    <li className={styles.bankCardListItem}>
                        <span className={styles.bankCardListText}>Проверка:</span>
                        <span
                            className={styles.bankCardListText}>{item.verification ? 'авторизован' : 'требуется авторизация'}</span>
                    </li>
                    <li className={styles.bankCardListItem}>
                        <span className={styles.bankCardListText}>СБП:</span>
                        <span className={styles.bankCardListText}>{item.spb ? 'включён' : 'отключён'}</span>
                    </li>
                    <li className={styles.bankCardListItem}>
                        <span className={styles.bankCardListText}>Платежи:</span>
                        <span
                            className={styles.bankCardListText}>{item.acceptingPayments ? 'прием активен' : 'прием на паузе'}</span>
                    </li>
                </ul>
            </div>
            <Modal
                show={showModal}
                widthContent={'472px'}
                backgroundColorOverlay={'rgba(13,17,20,0.57)'}
                handleClickOverlay={() => setShowModal(false)}>
                <span className={styles.bankModalClose} onClick={() => setShowModal(false)}>
                    <Close width={'18'} height={'18'} color={'#667180'}/>
                </span>
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
                </form>
            </Modal>
        </div>
    );
};
