import React from 'react';
import {useNavigate} from 'react-router-dom';
import {ChangePasswordForm} from '../../components/changePassword';
import styles from './styles.module.scss';


export const ChangePassword = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <ChangePasswordForm handleCancel={() => navigate(-1)}/>
        </div>
    );
};
