import React from 'react';
import {Back} from '../../../icons';
import styles from './styles.module.scss';

interface IGoBackProps {
    text: string;
    handleGoBack: () => void;
}

export const GoBack = ({text, handleGoBack}: IGoBackProps) => {
    return (
        <div className={styles.goBack} onClick={handleGoBack}>
            <span className={styles.goBackIcon}>
                <Back/>
            </span>
            <p className={styles.goBackText}>{text}</p>
        </div>
    );
};
