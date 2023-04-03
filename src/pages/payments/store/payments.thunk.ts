import {createAsyncThunk} from '@reduxjs/toolkit';
import {instanceApi, mockInstanceApi} from '../../../api';
import {IAuthState} from '../../auth/store/auth.slice';
import {paymentsDb} from '../../../db';

export const getPayments = createAsyncThunk(
    'payments/getPayments',
    async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onGet('/get-payments').reply(200, paymentsDb(), {
                Authorization: `Bearer ${auth.token}`
            });
            const res = await instanceApi.get('/get-payments', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            return res.data;
        } catch (e) {
        }
    }
);
