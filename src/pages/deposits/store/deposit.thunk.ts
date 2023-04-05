import {createAsyncThunk} from '@reduxjs/toolkit';
import {IAuthState} from '../../auth/store/auth.slice';
import {instanceApi, mockInstanceApi} from '../../../api';
import {handleError} from '../../../store/app.slice';
import {depositsDb} from '../../../db';

export const getDeposits = createAsyncThunk(
    'deposits/getDeposits',
    async (_, {dispatch, getState}) => {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@');
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onGet('/get-deposits').reply(200, depositsDb(), {
                Authorization: `Bearer ${auth.token}`
            });
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

export const getMoreDeposits = createAsyncThunk(
    'deposits/getMoreDeposits',
    async ({url}: { url: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onGet(url).reply(200, depositsDb(), {
                Authorization: `Bearer ${auth.token}`
            });
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
