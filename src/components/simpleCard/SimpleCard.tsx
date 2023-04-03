import React from 'react';
import {ISimpleCardProps} from './types';
import styles from './styles.module.scss';

export const SimpleCard = ({name, data, additionalData, footer}: ISimpleCardProps) => {
    return (
        <div className={styles.card}>
            <span className={styles.cardName}>{name}</span>
            <span className={styles.cardData}>{data}</span>
            <span className={styles.cardAdditionalData}>{additionalData}</span>
            {footer !== undefined ? footer : null}
        </div>
    );
};
