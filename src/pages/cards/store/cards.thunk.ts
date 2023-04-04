import {createAsyncThunk} from '@reduxjs/toolkit';
import {instanceApi, mockInstanceApi} from '../../../api';
import {IAuthState} from '../../auth/store/auth.slice';
import {cardsDb} from '../../../db';
import {handleError, handleSuccess} from '../../../store/app.slice';

export const getCards = createAsyncThunk(
    'cards/getCards',
    async (_, {dispatch, getState}) => {
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
    async ({url}: { url: string }, {dispatch, getState}) => {
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
    async ({cards}: { cards: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/connect-card', {cards}).reply(200, {message: 'Подключено 85 карт'}, {
                Authorization: `Bearer ${auth.token}`
            });
            const res = await instanceApi.post('/connect-card', {cards}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess(res.data));
            dispatch(getCards());
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const changeStatusCard = createAsyncThunk(
    'cards/changeStatusCard',
    async ({id, status}: { id: string, status: 'pause' | 'inactive' }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/change-status-card', {
                id,
                status
            }).reply(200, {message: `Статус карты ID ${id} изменен на ${status === 'pause' ? 'На паузе' : 'Не активный'}`}, {
                Authorization: `Bearer ${auth.token}`
            });
            const res = await instanceApi.post('/change-status-card', {id, status}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess(res.data));
            dispatch(getCards());
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);
