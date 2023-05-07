import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAppSelector} from '../hooks/app';
import {Loader} from '../components/loader';


export const PrivateRoute = (props: any) => {
    const {isAuth, loading, role} = useAppSelector(state => state.auth);
    if (loading) {
        return <Loader/>;
    }
    if (isAuth) {
        return <Outlet context={role}/>;
    } else {
        return <Navigate to={'/login'}/>;
    }
};
