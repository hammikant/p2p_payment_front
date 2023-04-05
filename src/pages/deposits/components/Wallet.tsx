import React, {useState} from 'react';
import {Close, Copy, Qr} from '../../../icons';
import {Modal} from '../../../components/modal';
import {SubTitle} from '../../../fields';
import styles from './styles.module.scss';

export const Wallet = ({wallet, walletQRCode}: { wallet: string, walletQRCode: string }) => {
    const [isCopyPress, setCopyPress] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleClipBoard = async () => {
        setCopyPress(true);
        await navigator.clipboard.writeText(wallet);
    };

    return (
        <>
            <label className={styles.walletLabel}>Ваш Tether TRC-20 адрес</label>
            <div className={styles.wallet}>
                <div className={styles.walletOutput}>
                    <span className={styles.walletText}>{wallet}</span>
                    <span
                        className={styles.walletIcon}
                        onMouseUp={() => setCopyPress(false)}
                        onMouseDown={handleClipBoard}><Copy
                        color={isCopyPress ? '#667180' : '#ffffff'}/></span>
                </div>
                <div className={styles.walletQr} onClick={() => setShowModal(true)}>
                    <Qr/>
                </div>
            </div>
            <Modal
                show={showModal}
                widthContent={'448px'}
                backgroundColorOverlay={'rgba(13,17,20,0.57)'}
                handleClickOverlay={() => setShowModal(false)}>
                <span
                    className={styles.walletCloseModal}
                    onClick={() => setShowModal(false)}
                >
                    <Close width={'18'} height={'18'} color={'#667180'}/>
                </span>
                <SubTitle text={'Tether TRC-20'}/>
                <div className={'space-top-32'}/>
                <img className={styles.walletQrCodeImage} src={walletQRCode} alt={'qr-code'}/>
                <p className={styles.walletText}>{wallet}</p>
            </Modal>
        </>
    );
};
