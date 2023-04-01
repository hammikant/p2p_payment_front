import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAppSelector} from '../hooks/app';
import {Loader} from '../components/loader';

export const PrivateRoute = () => {
    const {isAuth, loading} = useAppSelector(state => state.auth);
    if (loading) {
        return <Loader/>;
    }
    if (isAuth) {
        return <Outlet/>;
    } else {
        return <Navigate to={'/login'}/>;
    }
};
