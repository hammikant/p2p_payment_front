import React, {ReactNode} from 'react';
import styles from './styles.module.scss';

interface IModal {
    show: boolean;
    widthContent: string;
    children: ReactNode;
    handleClickOverlay: () => void;
}

export const Modal = ({handleClickOverlay, children, show, widthContent}: IModal) => {
    if (!show) {
        return <></>;
    }
    return (
        <div className={styles.wrapperModal}>
            <div className={styles.overlay} onClick={handleClickOverlay}/>
            <div className={styles.content} style={{width: widthContent}}>
                {children}
            </div>
        </div>
    );
};
