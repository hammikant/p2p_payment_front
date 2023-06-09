import {AnyAction, combineReducers, configureStore, Reducer} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/session';
import {persistReducer} from 'redux-persist';
import auth from '../pages/auth/store/auth.slice';
import payments from '../pages/payments/store/payments.slice';
import cards from '../pages/cards/store/cards.slice';
import deposits from '../pages/deposits/store/deposit.slice';
import banks from '../pages/banks/store/banks.slice';
import simBanks from '../pages/simBanks/store/simBanks.slice';
import statistic from '../pages/statistics/store/statistic.slice';
import app from './app.slice';

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
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}) //.concat(logger)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
