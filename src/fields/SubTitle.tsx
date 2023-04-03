import React from 'react';
import styles from './styles.module.scss';

export const SubTitle = ({text}: { text: string }) => {
    return <h2 className={styles.subtitle}>{text}</h2>;
};
