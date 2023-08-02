import {createAsyncThunk} from '@reduxjs/toolkit';
import {instanceApi} from '../../../api';
import {IAuthState} from '../../auth/store/auth.slice';
import {handleError, handleSuccess} from '../../../store/app.slice';
import {IConnectCard} from './types';

export const enum StatusCard {
    frozen = 'Активна',
    active = 'Не активна',
    inactive = 'На паузе'
}

export const getCards = createAsyncThunk(
    'cards/getCards',
    async ({status}: { status: StatusCard | null }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.get('/finances/cards', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const getMoreCards = createAsyncThunk(
    'cards/getMoreCards',
    async ({url, status}: { url: string, status: StatusCard | null }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            const res = await instanceApi.get(url, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const connectCards = createAsyncThunk(
    'cards/connectCards',
    async ({cards, id}: IConnectCard, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            const data: { [key: string]: string | number } = {
                cards,
                id
            };
            // if (accountName !== undefined) {
            //     data[accountName] = accountName;
            // }

            const res = await instanceApi.post('/finances/cards/connect', {...data}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess(res.data));
            dispatch(getCards({status: null}));

            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

const statusList: { [key: string]: string } = {
    pause: 'На паузе',
    inactive: 'Не активна',
    play: 'Активна',
};

export const changeStatusCard = createAsyncThunk(
    'cards/changeStatusCard',
    async ({id, status}: { id: string, status: 'Активна' | 'Не активна' | 'На паузе' }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.put('/finances/card', {id, status}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess(res.data));
            return res.data.card;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const searchByCardNumber = createAsyncThunk(
    'cards/searchByCardNumber',
    async ({cardNum}: { cardNum: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.post('/search-by-card-number', {cardNum}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const getCardsById = createAsyncThunk(
    'cards/getCardsById',
    async ({id}: { id: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.get('/finances/cards', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);
