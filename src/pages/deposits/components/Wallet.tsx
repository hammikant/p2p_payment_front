import React, {HTMLAttributes, useEffect, useRef, useState} from 'react';
import {Close, Qr} from '../../../icons';
import {Modal} from '../../../components/modal';
import {OutputClipBoard, SubTitle} from '../../../fields';
import styles from './styles.module.scss';

export const Wallet = ({wallet, walletQR}: { wallet: string, walletQR: string }) => {
    const codeRef = useRef<HTMLSpanElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [isCopyPress, setCopyPress] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (codeRef.current) {
            setWidth(codeRef.current.offsetWidth);
        }
    }, [wallet, showModal]);

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
                widthContent={`${width + 80}px`}
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
                <img className={styles.walletQrCodeImage} style={{width: `${width}px`, height: `${width}px`}} src={walletQR} alt={'qr-code'}/>
                <span
                    ref={codeRef}
                    className={'text-16'}
                    style={{display: 'inline-block', marginTop: '24px'}}
                >{wallet}</span>
            </Modal>
        </>
    );
};
