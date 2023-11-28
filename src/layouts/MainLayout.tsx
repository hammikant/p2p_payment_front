import React from 'react';
import {Navigate, useLocation, useOutletContext} from 'react-router-dom';
import {Header} from '../components/header';
import {Sidebar} from '../components/sidebar';
import {Logo} from '../icons';
import styles from './styles.module.scss';
import {IMainLayout} from './types';

const merchantPaths: string[] = ['/', '/stats', '/settings'];

export const MainLayout = ({children, titlePage, descriptionPage}: IMainLayout) => {
    const {pathname} = useLocation();
    const role = useOutletContext();

    if (role === 'merchant' && !merchantPaths.includes(pathname)) {
        return <Navigate to={'/'}/>;
    }

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
