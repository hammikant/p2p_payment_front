import React from 'react';
import {Title} from '../../fields';
import {IHeader} from './types';
import styles from './styles.module.scss';

export const Header = ({title, descriptionPage}: IHeader) => {
    return (
        <div className={styles.header}>
            <Title text={title}/>
            {descriptionPage ? <p className={styles.headerDescription}>{descriptionPage}</p> : null}
        </div>
    );
};
