import React from 'react';
import './App.scss';
import {Route, Routes} from 'react-router-dom';
import {PrivateRoute} from './routes';
import {ChangePassword, ForgotPassword, SignIn, SignUp} from './pages/auth';
import {Payments} from './pages/payments';
import {ErrorPage} from './pages/error';

function App() {
    return (
        <Routes>
            <Route path={'/registration'} element={<SignUp/>}/>
            <Route path={'/login'} element={<SignIn/>}/>
            <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
            <Route path={'/change-password'} element={<ChangePassword/>}/>
            <Route path={'/'} element={<PrivateRoute/>}>
                <Route path={'/'} element={<Payments/>}/>
                <Route path={'*'} element={<ErrorPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
