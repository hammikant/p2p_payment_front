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
        const res = await instanceApi.post(`/finances/${auth.role}/bank`, {...bank}, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        dispatch(handleSuccess({message: `Успешно создан ${res.data.name}`}));
        return res.data;
    }
);

export const getBanks = createAsyncThunk(
    'banks/getBanks',
    async (_, {dispatch, getState}) => {
        const {auth} = getState() as { auth: IAuthState };
        const res = await instanceApi.get(`/finances/${auth.role}/banks`, {
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

            const res = await instanceApi.put<IBank>(`/finances/${auth.role}/bank/${bank.id}`, {...bank}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess({message: `${res.data.name} успешно изменен.`}));
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

            const res = await instanceApi.delete(`/finances/${auth.role}/bank/${id}`, {
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
        try {
            const {auth} = getState() as { auth: IAuthState };
            const data: { [key: string]: string | number } = {
                cardNumbers,
                bankAccountId
            };
            const res = await instanceApi.post(`/finances/${auth.role}/cards/connect`, {...data}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess({message: 'Успешно подключено'}));
            return res.data.bank;
        } catch (e:any) {
            dispatch(handleError({message: e.response.detail, errors: {}}));
        }

    }
);

export const banksFilter = createAsyncThunk(
    'banks/banksFilter',
    async ({params}:{params: string},{getState}) => {
        const {auth} = getState() as { auth: IAuthState };
        const res = await instanceApi.get(`/finances/${auth.role}/banks?${params}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        return res.data;
    }
);

export const getAllPhoneNumbers = createAsyncThunk(
    'banks/getAllPhoneNumbers',
    async (_,{getState}) => {
        const {auth} = getState() as { auth: IAuthState };
        const res = await instanceApi.get('/messages/sim-banks/numbers', {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        return res.data;
    }
);
