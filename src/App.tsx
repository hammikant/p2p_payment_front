import React from 'react';
import './App.scss';
import {Route, Routes} from 'react-router-dom';
import {Home} from './pages/home';
import {PrivateRoute} from './routes';
import {SignUp} from './pages/auth';


function App() {
    return (
        <Routes>
            <Route path={'/login'} element={<SignUp/>}/>
            <Route path={'/'} element={<PrivateRoute/>}>
                <Route path={'/'} element={<Home/>}/>
            </Route>
        </Routes>
    );
}

export default App;
