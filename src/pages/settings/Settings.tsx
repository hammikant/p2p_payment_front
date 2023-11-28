import React, {useEffect, useMemo, useState} from 'react';
import {MainLayout} from '../../layouts';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {Modal} from '../../components/modal';
import {Close} from '../../icons';
import {ChangePasswordForm} from '../../components/changePassword';
import {getAccountHistory, getMoreHistory, terminateSessions} from '../../store/app.slice';
import {DisplayName, EmailForm, Table} from './components';
import styles from './styles.module.scss';

export const Settings = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth);

    const {commonData, historyActions, meta} = useAppSelector(state => state.app);
    const [emailModal, setEmailModal] = useState<boolean>(false);
    const [passwordModal, setPasswordModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getAccountHistory());
    }, []);

    const handleTerminateSession = async () => {
        dispatch(terminateSessions());
    };

    const fetchMoreData = () => {
        dispatch(getMoreHistory({url: meta.nextPageUrl}));
    };

    return (
        <MainLayout titlePage={'Настройки'} descriptionPage={'Управляйте своим аккаунтом'}>
            <DisplayName displayName={user.displayName}/>
            <div className={'space-top-48'}/>
            <span className={styles.label}>Email</span>
            <p className={styles.text}>
                {commonData.email}
                <span className={styles.buttonEdit}
                      onClick={() => setEmailModal(true)}>
                    Изменить
                </span>
            </p>
            <div className={'space-top-48'}/>
            <span className={styles.label}>Пароль</span>
            <p className={styles.text}>
                {user.changeDataPassword === '' ? 'Пароль еще не менялся' : user.changeDataPassword}
                <span className={styles.buttonEdit} style={{margin: '0px'}}
                      onClick={() => setPasswordModal(true)}>Изменить</span></p>

            <div className={'space-top-48'}/>
            <span className={styles.label}>Завершить другие сеансы</span>
            <p className={styles.text}>
                Вход будет сброшен на всех устройствах, кроме текущего
                <span className={styles.buttonStop} onClick={handleTerminateSession}>Завершить</span></p>

            {/*<div className={'space-top-48'}/>*/}
            {/*<span className={styles.label}>Telegram-уведомления</span>*/}
            {/*<p className={styles.text}>Приглашение в чат (1 актив): <span*/}
            {/*    className={styles.textLink}>https://t.me/dX3pYaSziXY7xCiL4cHcYegE</span></p>*/}
            {/*<p className={styles.text}>Подключёный аккаунт: <span*/}
            {/*    className={styles.textLink}>@manimani11111</span></p>*/}
            {/*<span className={styles.buttonEdit}>Отключить</span>*/}
            <div className={'space-top-48'}/>
            <span className={styles.label}>История активности</span>

            <div className={styles.row}>
                <div className={styles.col}>
                    <Table
                        items={historyActions ?? []}
                        fetchMoreData={fetchMoreData}
                        hasMore={meta.nextPageUrl !== null}
                    />
                </div>
            </div>
            <Modal
                show={emailModal}
                widthContent={'500px'}
                backgroundColorOverlay={'rgba(13,17,20,0.57)'}
                handleClickOverlay={() => setEmailModal(false)}>
                <span className={'closeIcon'} onClick={() => setEmailModal(false)}>
                    <Close width={'18'} height={'18'} color={'#667180'}/>
                </span>
                <EmailForm handleCansel={() => setEmailModal(false)}/>
            </Modal>
            <Modal
                show={passwordModal}
                widthContent={'472px'}
                backgroundColorOverlay={'rgba(13,17,20,0.57)'}
                handleClickOverlay={() => setPasswordModal(false)}>
                <ChangePasswordForm handleCancel={() => setPasswordModal(false)}/>
            </Modal>
        </MainLayout>
    );
};
