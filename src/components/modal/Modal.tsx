import React, {ReactNode} from 'react';
import styles from './styles.module.scss';

interface IModal {
    show: boolean;
    widthContent: string;
    backgroundColorOverlay: string;
    children: ReactNode;
    handleClickOverlay: () => void;
}

export const Modal = ({handleClickOverlay, children, backgroundColorOverlay, show, widthContent}: IModal) => {
    if (!show) {
        return <></>;
    }
    return (
        <div className={styles.wrapperModal} style={{backgroundColor: backgroundColorOverlay}}>
            <div className={styles.overlay} onClick={handleClickOverlay}/>
            <div className={styles.content} style={{width: widthContent}}>
                {children}
            </div>
        </div>
    );
};
