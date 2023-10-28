import React, {useEffect} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {ChangePasswordForm} from '../../components/changePassword';
import {useAppDispatch, useAppSelector} from '../../hooks/app';
import {Loader} from '../../components/loader';
import styles from './styles.module.scss';
import {restoreConfirmation} from './store/auth.thunk';


export const ChangePassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {loading, token} = useAppSelector(state => state.auth);
    const { restore } = location.state;

    useEffect(() => {
        if(restore) {
            dispatch(restoreConfirmation({params: restore}));
        }
    }, []);

    if (loading) {
        return <Loader/>;
    }

    return (
        <div className={styles.wrapper}>
            <ChangePasswordForm handleCancel={() => navigate('/login')}/>
        </div>
    );
};
