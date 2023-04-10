import {createAsyncThunk} from '@reduxjs/toolkit';
import {instanceApi, mockInstanceApi} from '../../../api';
import {IAuthState} from '../../auth/store/auth.slice';
import {banksDb, cardsDb} from '../../../db';
import {handleError, handleSuccess} from '../../../store/app.slice';
import {BankNames} from '../../../types';
import {IConnectCard} from './types';

export const enum StatusCard {
    frozen = 'Активна',
    active = 'Не активна',
    inactive = 'На паузе'
}

export const getCards = createAsyncThunk(
    'cards/getCards',
    async ({status}: { status: StatusCard | null }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onGet('/get-cards').reply(200, cardsDb(), {
                Authorization: `Bearer ${auth.token}`
            });
            const res = await instanceApi.get('/get-cards', {
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

export const getMoreCards = createAsyncThunk(
    'cards/getMoreCards',
    async ({url, status}: { url: string, status: StatusCard | null }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onGet(url).reply(200, cardsDb(), {
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

export const connectCards = createAsyncThunk(
    'cards/connectCards',
    async ({cards, accountName, id}: IConnectCard, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            const data: { [key: string]: string | number } = {
                cards,
                id
            };
            if (accountName !== undefined) {
                data[accountName] = accountName;
            }
            const cB = banksDb().banks.filter(i => i.id === id);
            await mockInstanceApi.onPost('/connect-card', {...data})
                .reply(200, {
                    message: 'Подключено 85 карт'
                }, {
                    Authorization: `Bearer ${auth.token}`
                });
            const res = await instanceApi.post('/connect-card', {...data}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess(res.data));
            dispatch(getCards({status: null}));

            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

const statusList: { [key: string]: string } = {
    pause: 'На паузе',
    inactive: 'Не активна',
    play: 'Активна',
};

export const changeStatusCard = createAsyncThunk(
    'cards/changeStatusCard',
    async ({id, status}: { id: string, status: 'Активна' | 'Не активна' | 'На паузе' }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/change-status-card', {
                id,
                status
            }).reply(200,
                {
                    card: {
                        bankName: BankNames.sber,
                        num: '4001 9192 5753 7193',
                        data: '20 мар. 2023, 15:48',
                        id: id,
                        bank: 'Не подключён',
                        status: status
                    },
                    message: `Статус карты ID ${id} изменен на ${status}`
                }, {
                    Authorization: `Bearer ${auth.token}`
                });
            const res = await instanceApi.post('/change-status-card', {id, status}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess(res.data));
            return res.data.card;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const searchByCardNumber = createAsyncThunk(
    'cards/searchByCardNumber',
    async ({cardNum}: { cardNum: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/search-by-card-number', {
                cardNum
            }).reply(200,
                {
                    cards: [{
                        bankName: BankNames.sber,
                        num: '4001 9192 5753 7193',
                        data: '20 мар. 2023, 15:48',
                        id: 2,
                        bank: 'Не подключён',
                        status: 'Не активна'
                    }],
                }, {
                    Authorization: `Bearer ${auth.token}`
                });
            const res = await instanceApi.post('/search-by-card-number', {cardNum}, {
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

export const getCardsById = createAsyncThunk(
    'cards/getCardsById',
    async ({id}: { id: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onGet(`/get-cards-by-id-bank?id=${id}`).reply(200,
                {
                    cards: [{
                        bankName: BankNames.sber,
                        num: '4001 9192 5753 7193',
                        data: '20 мар. 2023, 15:48',
                        id: 2,
                        bank: 'Не подключён',
                        status: 'Не активна'
                    }],
                }, {
                    Authorization: `Bearer ${auth.token}`
                });
            const res = await instanceApi.get(`/get-cards-by-id-bank?id=${id}`, {
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
