import {createAsyncThunk} from '@reduxjs/toolkit';
import {IAuthState} from '../../auth/store/auth.slice';
import {instanceApi, mockInstanceApi} from '../../../api';
import {handleError, handleSuccess} from '../../../store/app.slice';
import {banksDb} from '../../../db';
import {IBank} from './types';

export const addBank = createAsyncThunk(
    'banks/addBank',
    async ({bank}: { bank: IBank }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/add-bank',
                {bank})
                .reply(200,
                    {message: 'Успешно добавлен банк', bank},
                    {
                        Authorization: `Bearer ${auth.token}`
                    });
            const res = await instanceApi.post('/add-bank', {bank}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess({message: res.data.message}));
            return res.data.bank;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const getBanks = createAsyncThunk(
    'banks/getBanks',
    async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onGet('/get-bank',)
                .reply(200,
                    banksDb(),
                    {
                        Authorization: `Bearer ${auth.token}`
                    });
            const res = await instanceApi.get('/get-bank', {
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
