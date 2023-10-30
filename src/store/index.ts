import {AnyAction, combineReducers, configureStore, Reducer} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/session';
import {persistReducer} from 'redux-persist';
import logger from 'redux-logger';
import auth, {setAppLoader} from '../pages/auth/store/auth.slice';
import payments from '../pages/payments/store/payments.slice';
import cards from '../pages/cards/store/cards.slice';
import deposits from '../pages/deposits/store/deposit.slice';
import banks from '../pages/banks/store/banks.slice';
import simBanks from '../pages/simBanks/store/simBanks.slice';
import statistic from '../pages/statistics/store/statistic.slice';
import {instanceApi} from '../api';
import {errorsMessage} from '../utils/constants';
import app, {clearStorage, handleError} from './app.slice';
import {appApi} from './app.api';

const appReducer = combineReducers({
    app,
    auth,
    payments,
    cards,
    deposits,
    banks,
    simBanks,
    statistic
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    //blacklist: []
};

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === 'app/clearStorage') {
        sessionStorage.removeItem('persis:root');
        state = {} as RootState;
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false})
            .concat(/*logger*/)
});

instanceApi.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if(error.response.status === 401) {
        store.dispatch(setAppLoader(true));
        store.dispatch(clearStorage());
        setTimeout(() => {
            store.dispatch(setAppLoader(false));
        }, 1000);
    }
    const {data} = error.response;
    if(data?.includes('<!DOCTYPE html>')) {
        store.dispatch(handleError({message: 'Не известная шибка', errors: {}}));
        return Promise.reject(error);
    }
    const keys = Object.keys(data);
    const values = Object.values(data);
    if(keys.length > 0) {
        for (let i = 0; i < values.length; i++) {
            const translate = errorsMessage[keys[i]] ?? keys[i];
            store.dispatch(handleError({message: `${translate}: ${values[i]}`, errors: {}}));
        }
        return Promise.reject(error);
    }
    return Promise.reject(error);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
