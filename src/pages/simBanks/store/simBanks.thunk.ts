import {createAsyncThunk} from '@reduxjs/toolkit';
import {IAuthState} from '../../auth/store/auth.slice';
import {instanceApi, mockInstanceApi} from '../../../api';
import {handleError, handleSuccess} from '../../../store/app.slice';
import {simBanksDb, simpleSimBank} from '../../../db/sim_banks_db';
import {ICellPhoneSimBank} from './types';

export const addSimBank = createAsyncThunk(
    'sinBanks/addSimBank',
    async ({name, apiKey}: { name: string, apiKey: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/add-sim-banks', {name, apiKey})
                .reply(200,
                    {...simpleSimBank, name}, {
                        Authorization: `Bearer ${auth.token}`
                    });
            const res = await instanceApi.post('/add-sim-banks', {name, apiKey}, {
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

export const getSimBanks = createAsyncThunk(
    'sinBanks/getSimBanks',
    async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onGet('/get-sim-banks').reply(200,
                simBanksDb(), {
                    Authorization: `Bearer ${auth.token}`
                });
            const res = await instanceApi.get('/get-sim-banks', {
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

export const connectCellPhonesInSimBank = createAsyncThunk(
    'sinBanks/connectCellPhonesInSimBank',
    async ({id, cellPhones}: { id: number, cellPhones: ICellPhoneSimBank[] }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/connect-cellphones', {id, cellPhones})
                .reply(200,
                    {id, cellPhones, message: `К SIM-банку ID ${id} подключено ${cellPhones.length} номеров`}, {
                        Authorization: `Bearer ${auth.token}`
                    });
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
            await mockInstanceApi.onDelete(`/delete-sim-banks?id=${id}`).reply(200,
                {message: `Успешно удален cим банк ID ${id}`}, {
                    Authorization: `Bearer ${auth.token}`
                });
            const res = await instanceApi.delete(`/delete-sim-banks?id=${id}`, {
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
            await mockInstanceApi.onPost('/delete-cell-phones-from-sim-bank', {
                id,
                cellPhones
            }).reply(200,
                {
                    message: `Номера удалены из сим банка ID ${id}`,
                    id,
                    cellPhones
                }, {
                    Authorization: `Bearer ${auth.token}`
                });
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
