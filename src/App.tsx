import React, {useEffect} from 'react';
import './App.scss';
import {Route, Routes} from 'react-router-dom';
import {PrivateRoute} from './routes';
import {ChangePassword, ForgotPassword, SignIn, SignUp} from './pages/auth';
import {Payments} from './pages/payments';
import {ErrorPage} from './pages/error';
import {Cards} from './pages/cards';
import {useAppAlert} from './hooks/useAppAlert';
import {useAppSelector} from './hooks/app';
import {alertTypes} from './types';
import {Deposits} from './pages/deposits';

function App() {
    const {initAlert} = useAppAlert();
    const {error, success} = useAppSelector(state => state.app);

    useEffect(() => {
        error !== null && initAlert({
            type: alertTypes.ERROR,
            text: error?.message ?? '',
        });
        success !== null && initAlert({
            type: alertTypes.SUCCESS,
            text: success?.message ?? '',
        });
    }, [error, success]);

    return (
        <Routes>
            <Route path={'/registration'} element={<SignUp/>}/>
            <Route path={'/login'} element={<SignIn/>}/>
            <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
            <Route path={'/change-password'} element={<ChangePassword/>}/>
            <Route path={'/'} element={<PrivateRoute/>}>
                <Route path={'/'} element={<Payments/>}/>
                <Route path={'/deposits'} element={<Deposits/>}/>
                <Route path={'/cards'} element={<Cards/>}/>
                <Route path={'*'} element={<ErrorPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
