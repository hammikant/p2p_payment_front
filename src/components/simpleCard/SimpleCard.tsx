import React from 'react';
import {ISimpleCardProps} from './types';
import styles from './styles.module.scss';

export const SimpleCard = ({name, data, additionalData, footer, ...props}: ISimpleCardProps) => {
    return (
        <div className={styles.card} {...props}>
            <span className={styles.cardName}>{name}</span>
            <span className={styles.cardData}>{data}</span>
            <span className={styles.cardAdditionalData}>{additionalData}</span>
            {footer !== undefined ? footer : null}
        </div>
    );
};
