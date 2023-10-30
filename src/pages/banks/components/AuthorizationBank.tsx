import React from 'react';
import {Button, SubTitle} from '../../../fields';
import {IVerificationData} from '../store/types';
import styles from './styles.module.scss';

interface IAuthorizationBankProps extends IVerificationData {
    bankName: string,
    handleDone: () => void;
}

export const AuthorizationBank = ({bankName, cellPhone, verificationAmount, verificationComment, handleDone}: IAuthorizationBankProps) => {
    return (
        <>
            <SubTitle text={'Авторизация'}/>
            <div className={'space-top-24'}/>
            <p className={styles.bankModalText}>Для прохождения авторизации отправьте указанные сумму с комментарием на
                номер банка.</p>
            <p className={styles.bankModalText}>Внимание! Для успешной авторизации, отправка должна осуществляться
                только из банка {bankName}</p>
            <div className={'space-top-32'}/>
            <ul className={styles.bankModalList}>
                <li className={styles.bankModalListItem}>
                    <span className={styles.bankModalListText}>Отправить из:</span>
                    <span className={styles.bankModalListText}>{bankName}</span>
                </li>
                <li className={styles.bankModalListItem}>
                    <span className={styles.bankModalListText}>На номер банка:</span>
                    <span className={styles.bankModalListText}>{cellPhone}</span>
                </li>
                <li className={styles.bankModalListItem}>
                    <span className={styles.bankModalListText}>Сумма:</span>
                    <span className={styles.bankModalListText}>{verificationAmount} ₽</span>
                </li>
                <li className={styles.bankModalListItem}>
                    <span className={styles.bankModalListText}>Комментарий:</span>
                    <span className={styles.bankModalListText}>{verificationComment}</span>
                </li>
            </ul>
            <Button
                variant={'full'}
                text={'Готово'}
                style={{width: '143px', marginTop: '40px'}}
                onClick={handleDone}
            />
        </>
    );
};
