import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {positions, Provider as AlertProvider, transitions} from 'react-alert';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from './store';
import {Alert} from './components/alert';


const options = {
    position: positions.BOTTOM_LEFT,
    timeout: 0,
    offset: '20px',
    transition: transitions.SCALE,
};

const persist_store = persistStore(store);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persist_store}>
                <BrowserRouter>
                    <AlertProvider template={Alert} {
                        ...options
                    }>
                        <App/>
                    </AlertProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
