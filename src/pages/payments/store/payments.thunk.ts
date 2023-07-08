import {createAsyncThunk} from '@reduxjs/toolkit';
import {instanceApi} from '../../../api';
import {IAuthState} from '../../auth/store/auth.slice';
import {StatusCardPayments} from '../../../types';
import {handleError} from '../../../store/app.slice';

export const getPayments = createAsyncThunk(
    'payments/getPayments',
    async ({status}: { status: StatusCardPayments | null }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            const res = await instanceApi.get('/finances/payments', {
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

export const getMorePayments = createAsyncThunk(
    'payments/getMorePayments',
    async ({url, status}: { url: string, status: StatusCardPayments }, {dispatch, getState}) => {
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

export const searchByCardNumberPayments = createAsyncThunk(
    'cards/searchByCardNumberPayments',
    async ({cardNum}: { cardNum: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            const res = await instanceApi.post('/search-by-card-number-payments', {cardNum}, {
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
