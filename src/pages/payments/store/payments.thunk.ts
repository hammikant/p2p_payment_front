import {createAsyncThunk} from '@reduxjs/toolkit';
import {instanceApi} from '../../../api';
import {IAuthState} from '../../auth/store/auth.slice';
import {StatusCardPayments} from '../../../types';
import {handleError} from '../../../store/app.slice';

export const getPayments = createAsyncThunk(
    'payments/getPayments',
    async (_, { getState, dispatch}) => {
            const {auth} = getState() as { auth: IAuthState };
            const res = await instanceApi.get(`/finances/${auth.role}/payments`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            return res.data;
    }
);

export const getMorePayments = createAsyncThunk(
    'payments/getMorePayments',
    async ({url, status}: { url: string, status: StatusCardPayments }, {dispatch, getState}) => {
            const {auth} = getState() as { auth: IAuthState };
            const res = await instanceApi.get(url, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            return res.data;
    }
);

export const paymentsFilter = createAsyncThunk(
    'cards/paymentsFilter',
    async ({params}: { params: string }, {dispatch, getState}) => {
            const {auth} = getState() as { auth: IAuthState };
            const res = await instanceApi.get(`/finances/${auth.role}/payments?${params}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            return res.data;
    }
);
