import React from 'react';
import {Header} from '../components/header';
import {Sidebar} from '../components/sidebar';
import {Logo} from '../icons';
import styles from './styles.module.scss';
import {IMainLayout} from './types';

export const MainLayout = ({children, titlePage, descriptionPage}: IMainLayout) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <span className={styles.logo}>
                    <Logo/>
                </span>
                <Sidebar/>
            </div>
            <div className={styles.pageContent}>
                <Header title={titlePage} descriptionPage={descriptionPage}/>
                {children}
            </div>
        </div>
    );
};
