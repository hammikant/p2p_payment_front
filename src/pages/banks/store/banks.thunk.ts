import {createAsyncThunk} from '@reduxjs/toolkit';
import {IAuthState} from '../../auth/store/auth.slice';
import {instanceApi} from '../../../api';
import {handleError, handleSuccess} from '../../../store/app.slice';
import {IConnectCard} from '../../cards/store/types';
import {IBank} from './types';

export const addBank = createAsyncThunk(
    'banks/addBank',
    async ({bank}: { bank: IBank }, {dispatch, getState}) => {
        const {auth} = getState() as { auth: IAuthState };
        const res = await instanceApi.post('/finances/bank', {...bank}, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        dispatch(handleSuccess({message: res.data.message}));
        return res.data.bank;
    }
);

export const getBanks = createAsyncThunk(
    'banks/getBanks',
    async (_, {dispatch, getState}) => {
        const {auth} = getState() as { auth: IAuthState };
        const res = await instanceApi.get('/finances/banks', {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        return res.data;
    }
);

interface IAuthorizationBankRequest {
    id: number;
    item: IBank; //@todo это передается только для мок api на production удалить
}

export const authorizationBank = createAsyncThunk(
    'banks/authorizationBank',
    async ({id, item}: IAuthorizationBankRequest, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.post('/authorization-bank', {id}, {
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

export const updateBank = createAsyncThunk(
    'banks/updateBank',
    async ({bank}: { bank: IBank }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.put(`/bank/${bank.id}`, {...bank}, {
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

export const deleteBank = createAsyncThunk(
    'banks/deleteBank',
    async ({id}: { id: number }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.delete(`/delete-bank?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess({message: res.data.message}));
            return id;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);


export const getMoreBanks = createAsyncThunk(
    'banks/getMoreBanks',
    async ({url, status}: { url: string, status: string }, {dispatch, getState}) => {
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

export const connectCardsInBank = createAsyncThunk(
    'banks/connectCardsInBank',
    async ({cardNumbers, bankAccountId}: IConnectCard, {dispatch, getState}) => {
        const {auth} = getState() as { auth: IAuthState };
        const data: { [key: string]: string | number } = {
            cardNumbers,
            bankAccountId
        };
        const res = await instanceApi.post('/finances/cards/connect', {...data}, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        dispatch(handleSuccess({message: 'Успешно подключено'}));
        return res.data.bank;
    }
);

export const banksFilter = createAsyncThunk(
    'cards/banksFilter',
    async ({params}:{params: string},{getState}) => {
        const {auth} = getState() as { auth: IAuthState };
        const res = await instanceApi.get(`/finances/banks?${params}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        return res.data;
    }
);
