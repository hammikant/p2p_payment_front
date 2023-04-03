import React from 'react';
import {MainLayout} from '../../layouts';
import styles from './styles.module.scss';

export const ErrorPage = () => {
    return (
        <MainLayout titlePage={'Страницы не существует'}>
            <p className={styles.errorText}>404</p>
        </MainLayout>
    );
};
