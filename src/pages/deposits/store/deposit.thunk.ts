import {createAsyncThunk} from '@reduxjs/toolkit';
import {IAuthState} from '../../auth/store/auth.slice';
import {instanceApi} from '../../../api';
import {handleError} from '../../../store/app.slice';

export const getDeposits = createAsyncThunk(
    'deposits/getDeposits',
    async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.get('/get-deposits', {
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

export const checkDeposit = createAsyncThunk(
    'deposits/checkDeposit',
    async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            const res = await instanceApi.get('/check-deposits', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const getMoreDeposits = createAsyncThunk(
    'deposits/getMoreDeposits',
    async ({url}: { url: string }, {dispatch, getState}) => {
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
