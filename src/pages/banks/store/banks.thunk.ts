import {createAsyncThunk} from '@reduxjs/toolkit';
import {IAuthState} from '../../auth/store/auth.slice';
import {instanceApi, mockInstanceApi} from '../../../api';
import {handleError, handleSuccess} from '../../../store/app.slice';
import {banksDb} from '../../../db';
import {BankNames} from '../../../types';
import {IBank} from './types';

export const addBank = createAsyncThunk(
    'banks/addBank',
    async ({bank}: { bank: IBank }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            // added mock data
            const objRequest = {...bank, verificationData: {cellPhone: '+7 987 654 32 10', comment: '6549'}};
            await mockInstanceApi.onPost('/add-bank',
                {bank})
                .reply(200,
                    {message: 'Успешно добавлен банк', bank: objRequest},
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
    async ({status}: { status: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/get-bank', {status})
                .reply(200,
                    banksDb(),
                    {
                        Authorization: `Bearer ${auth.token}`
                    });
            const res = await instanceApi.post('/get-bank', {status}, {
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

interface IAuthorizationBankRequest {
    id: number;
    item: IBank; //@todo это передается только для мок api на production удалить
}

export const authorizationBank = createAsyncThunk(
    'banks/authorizationBank',
    async ({id, item}: IAuthorizationBankRequest, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/authorization-bank', {id})
                .reply(200,
                    {...item, verification: true, verificationData: null},
                    {
                        Authorization: `Bearer ${auth.token}`
                    });
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
            await mockInstanceApi.onPut('/update-bank', {bank})
                .reply(200,
                    {bank},
                    {
                        Authorization: `Bearer ${auth.token}`
                    });
            const res = await instanceApi.put('/update-bank', {bank}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            return res.data.bank;
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
            await mockInstanceApi.onDelete(`/delete-bank?id=${id}`)
                .reply(200,
                    {message: `Успешно удален банк ID ${id}`},
                    {
                        Authorization: `Bearer ${auth.token}`
                    });
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

export const searchByPhoneLogin = createAsyncThunk(
    'cards/searchByPhoneLogin',
    async ({cellPhone, bankName}: { cellPhone: string, bankName: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/search-by-phone-login', {
                bankName,
                cellPhone
            }).reply(200,
                {
                    banks: [{
                        id: 10,
                        name: 'Название макс 25 символов',
                        bankName: BankNames.sbp,
                        cards: '80шт',
                        verification: true,
                        spb: true,
                        acceptingPayments: false,
                        create_as: '20 мар. 2023',
                        verificationData: null,
                        simBankCellPhone: '+7 987 654 32 10'
                    }],
                }, {
                    Authorization: `Bearer ${auth.token}`
                });
            const res = await instanceApi.post('/search-by-phone-login', {
                bankName,
                cellPhone
            }, {
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

export const getMoreBanks = createAsyncThunk(
    'banks/getMoreBanks',
    async ({url, status}: { url: string, status: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onGet(url).reply(200, banksDb(), {
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
