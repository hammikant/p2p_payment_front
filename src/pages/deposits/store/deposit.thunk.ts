import {createAsyncThunk} from '@reduxjs/toolkit';
import {IAuthState} from '../../auth/store/auth.slice';
import {instanceApi} from '../../../api';
import {handleError} from '../../../store/app.slice';

export const getDeposits = createAsyncThunk(
    'deposits/getDeposits',
    async (_, {dispatch, getState}) => {
        const {auth} = getState() as { auth: IAuthState };
        const res = await instanceApi.get('/finances/trader/deposits', {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        return res.data;
    }
);

export const checkDeposit = createAsyncThunk(
    'deposits/checkDeposit',
    async (_, {dispatch, getState}) => {
            const {auth} = getState() as { auth: IAuthState };
            const res = await instanceApi.get('/finances/trader/deposits/check', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
    }
);

export const getMoreDeposits = createAsyncThunk(
    'deposits/getMoreDeposits',
    async ({url}: { url: string }, {dispatch, getState}) => {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.get(url, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            return res.data;
    }
);
