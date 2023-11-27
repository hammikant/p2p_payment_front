import React, {useEffect} from 'react';
import {Navigate, Outlet, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../hooks/app';
import {Loader} from '../components/loader';
import {useInterval} from '../hooks/useInterval';
import {getPayments} from '../pages/payments/store/payments.thunk';
import {StatusCardPayments} from '../types';
import {getBanks} from '../pages/banks/store/banks.thunk';
import {getAccount, getExchangeRates} from '../store/app.slice';
import {getSimBanks} from '../pages/simBanks/store/simBanks.thunk';

export const PrivateRoute = () => {
    const dispatch = useAppDispatch();
    const {isAuth, loading, role} = useAppSelector(state => state.auth);
    const {isUseFilter, meta: metaBanks} = useAppSelector(state => state.banks);
    const {isUseFilterPayment, meta: metaPayments} = useAppSelector(state => state.payments);
    const params = useParams();
    const restore = params['*'];

    useInterval(() => {
        if (isAuth) {
            dispatch(getExchangeRates());
            if (role !== 'merchant' && !isUseFilter) {
                if (!isUseFilter && metaBanks.prevPageUrl === null) {
                    dispatch(getBanks());
                }
            }
            if(role !== 'merchant') {
                dispatch(getSimBanks());
            }
            if (!isUseFilterPayment && metaPayments.prevPageUrl === null) {
                dispatch(getPayments());
            } //@todo проверить

            dispatch(getAccount());
        }
    }, 30000);

    useEffect(() => {
        dispatch(getExchangeRates());
        if (isAuth) {
            if (role !== 'merchant') {
                dispatch(getBanks());
                dispatch(getPayments());
                dispatch(getSimBanks());
            }
            dispatch(getAccount());
        }
    }, [isAuth]);

    if (loading) {
        return <Loader/>;
    }

    if (isAuth) {
        return <Outlet context={role}/>;
    } else {
        return restore?.includes('restore')
            ? <Navigate to={'/restore'} state={{restore}}/>
            : <Navigate to={'/login'}/>;
    }
};
