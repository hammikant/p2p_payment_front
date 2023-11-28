import {createAsyncThunk} from '@reduxjs/toolkit';
import {IAuthState} from '../../auth/store/auth.slice';
import {instanceApi} from '../../../api';
import {handleError, handleSuccess} from '../../../store/app.slice';
import {ICellPhoneSimBank, ISimBank} from './types';

export const addSimBank = createAsyncThunk(
    'sinBanks/addSimBank',
    async ({displayName, apiKey}: { displayName: string, apiKey: string }, { getState}) => {
        const {auth} = getState() as { auth: IAuthState };

        const res = await instanceApi.post('/messages/sim-bank', {displayName, apiKey}, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        return res.data;
    }
);

export const getSimBanks = createAsyncThunk(
    'sinBanks/getSimBanks',
    async (_, {dispatch, getState}) => {
        const {auth} = getState() as { auth: IAuthState };

        const res = await instanceApi.get('/messages/sim-banks', {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        return res.data;
    }
);

export const changeSimBank = createAsyncThunk(
    'sinBanks/changeDisplayName',
    async ({displayName, apiKey, id}:ISimBank, {getState}) => {
        const {auth} = getState() as { auth: IAuthState };

        const res = await instanceApi.put(`/messages/sim-bank/${id}`, {displayName, apiKey},{
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        return res.data;
    }
);

export const getSimBankNumber = createAsyncThunk(
    'sinBanks/getSimBankNumber',
    async () => {

    }
);

export const connectCellPhonesInSimBank = createAsyncThunk(
    'sinBanks/connectCellPhonesInSimBank',
    async ({id, cellPhones}: { id: number, cellPhones: ICellPhoneSimBank[] }, {dispatch, getState}) => {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.post('/connect-cellphones', {id, cellPhones}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess({message: res.data.message}));
            return res.data;
    }
);

export const deleteSimBank = createAsyncThunk(
    'sinBanks/deleteSimBank',
    async ({id}: { id: number }, {dispatch, getState}) => {

            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.delete(`/messages/sim-bank/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess({message: `Успешно удален сим банк ID ${id}`}));
            return id;

    }
);

export const deleteCellPhones = createAsyncThunk(
    'sinBanks/deleteCellPhones',
    async ({id, cellPhones}: { id: number, cellPhones: ICellPhoneSimBank[] }, {dispatch, getState}) => {

            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.post('/delete-cell-phones-from-sim-bank', {
                id,
                cellPhones
            }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess({message: res.data.message}));
            return res.data;

    }
);
