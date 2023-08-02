import React, {useState} from 'react';
import {Close, Qr} from '../../../icons';
import {Modal} from '../../../components/modal';
import {OutputClipBoard, SubTitle} from '../../../fields';
import styles from './styles.module.scss';

export const Wallet = ({wallet, walletQR}: { wallet: string, walletQR: string }) => {
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
                <OutputClipBoard
                    text={wallet}
                    isCopyPress={isCopyPress}
                    onMouseUp={() => setCopyPress(false)}
                    onMouseDown={handleClipBoard}
                />
                <div className={styles.walletQr} onClick={() => setShowModal(true)}>
                    <Qr/>
                </div>
            </div>
            <Modal
                show={showModal}
                widthContent={'400px'}
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
                <img className={styles.walletQrCodeImage} src={walletQR} alt={'qr-code'}/>
                <p className={'text-16'} style={{marginBottom: '0px'}}>{wallet}</p>
            </Modal>
        </>
    );
};
