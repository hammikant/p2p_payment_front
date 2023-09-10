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

export const changeDisplayName = createAsyncThunk(
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

export const connectCellPhonesInSimBank = createAsyncThunk(
    'sinBanks/connectCellPhonesInSimBank',
    async ({id, cellPhones}: { id: number, cellPhones: ICellPhoneSimBank[] }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.post('/connect-cellphones', {id, cellPhones}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess({message: res.data.message}));
            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const deleteSimBank = createAsyncThunk(
    'sinBanks/deleteSimBank',
    async ({id}: { id: number }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.delete(`/messages/sim-bank/${id}`, {
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

export const deleteCellPhones = createAsyncThunk(
    'sinBanks/deleteCellPhones',
    async ({id, cellPhones}: { id: number, cellPhones: ICellPhoneSimBank[] }, {dispatch, getState}) => {
        try {
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
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);
