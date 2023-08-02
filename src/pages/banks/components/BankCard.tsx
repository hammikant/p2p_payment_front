import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {IBank} from '../store/types';
import {Modal} from '../../../components/modal';
import {Close} from '../../../icons';
import {viewBankNames} from '../../../utils';
import {useAppDispatch} from '../../../hooks/app';
import {authorizationBank} from '../store/banks.thunk';
import {icons} from '../../../utils/constants';
import styles from './styles.module.scss';
import {SettingsForm} from './SettingsForm';
import {AuthorizationBank} from './AuthorizationBank';
const raifaisen = require('../../../assets/images/raifaisen.png');
const vtb = require('../../../assets/images/vtb.png');
const sber = require('../../../assets/images/sber.png');
const sbp = require('../../../assets/images/sbp.png');
const alfa = require('../../../assets/images/alfa.png');
const akbars = require('../../../assets/images/akbars.png');
const gazrpom = require('../../../assets/images/gazrpom.png');
const tinkoff = require('../../../assets/images/tinkoff.png');

const paths:{[key:string]: string} = {
    raifaisen: raifaisen,
    vtb: vtb,
    sber: sber,
    sbp: sbp,
    alfa: alfa,
    akbars: akbars,
    gazrpom: gazrpom,
    tinkoff: tinkoff
};

export interface IBankCardProps {
    item: IBank;
}

export const BankCard = ({item}: IBankCardProps) => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const methods = useForm();

    const handleSelect = () => {
        setShowModal(true);
    };

    const handleAuthorization = () => {
        dispatch(authorizationBank({id: item.id, item}));
    };

    return (
        <div className={styles.col}>
            <div className={styles.bankCard} onClick={handleSelect}>
                <div className={styles.bankCardHeader}>
                    <img src={paths[item.bank]} className={styles.bankCardLogo} alt={item.bank}/>
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
                            className={styles.bankCardListText}
                            style={{color: item.verification ? '#ffffff' : '#F22451'}}
                        >{item.verification ? 'авторизован' : 'требуется авторизация'}</span>
                    </li>
                    <li className={styles.bankCardListItem}>
                        <span className={styles.bankCardListText}>СБП:</span>
                        <span className={styles.bankCardListText}>{item.isAcceptingSbp ? 'включён' : 'отключён'}</span>
                    </li>
                    <li className={styles.bankCardListItem}>
                        <span className={styles.bankCardListText}>Платежи:</span>
                        <span
                            className={styles.bankCardListText}
                            style={{color: item.isAcceptingPayments ? '#91F230' : '#F22451'}}
                        >{item.isAcceptingPayments ? 'прием активен' : 'прием на паузе'}</span>
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
                {!item.verification
                    ? (
                        <AuthorizationBank
                            cellPhone={''}
                            comment={''}
                            bankName={viewBankNames[item.bank]}
                            handleDone={handleAuthorization}
                        />
                    ) : (
                        <FormProvider {...methods}>
                            <SettingsForm item={item}/>
                        </FormProvider>
                    )}
            </Modal>
        </div>
    );
};
