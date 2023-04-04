import {createAsyncThunk} from '@reduxjs/toolkit';
import {instanceApi, mockInstanceApi} from '../../../api';
import {IAuthState} from '../../auth/store/auth.slice';
import {paymentsDb} from '../../../db';
import {BankNames, StatusCardPayments} from '../../../types';
import {handleError} from '../../../store/app.slice';

export const getPayments = createAsyncThunk(
    'payments/getPayments',
    async ({status}: { status: StatusCardPayments | null }, {dispatch, getState}) => {
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
            await mockInstanceApi.onGet(url).reply(200, paymentsDb(), {
                Authorization: `Bearer ${auth.token}`
            });
            const res = await instanceApi.get(url, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            return res.data;
        } catch (e) {
        }
    }
);

export const searchByCardNumberPayments = createAsyncThunk(
    'cards/searchByCardNumberPayments',
    async ({cardNum}: { cardNum: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/search-by-card-number-payments', {
                cardNum
            }).reply(200,
                {
                    cards: [{
                        bankName: BankNames.akbars,
                        num: '4001 9192 5753 7193',
                        data: '20 мар. 2023, 15:48',
                        id: 1,
                        profit: 7564435,
                        sum: 8766534543,
                        status: StatusCardPayments.success
                    }],
                }, {
                    Authorization: `Bearer ${auth.token}`
                });
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
