import {createAsyncThunk} from '@reduxjs/toolkit';
import {instanceApi} from '../../../api';
import {IAuthState} from '../../auth/store/auth.slice';
import {handleError, handleSuccess} from '../../../store/app.slice';
import {StatusCard} from '../components/TableItem';
import {IConnectCard} from './types';



export const getCards = createAsyncThunk(
    'cards/getCards',
    async ({status}: { status: StatusCard | null }, {dispatch, getState}) => {
        const {auth} = getState() as { auth: IAuthState };

        const res = await instanceApi.get(`/finances/${auth.role}/cards`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        return res.data;
    }
);

export const getMoreCards = createAsyncThunk(
    'cards/getMoreCards',
    async ({url, status}: { url: string, status: StatusCard | null }, {dispatch, getState}) => {
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

export const connectCards = createAsyncThunk(
    'cards/connectCards',
    async ({cardNumbers, bankAccountId}: IConnectCard, {dispatch, getState}) => {
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
        dispatch(handleSuccess(res.data));
        dispatch(getCards({status: null}));
        return res.data;
    }
);

export const changeStatusCard = createAsyncThunk(
    'cards/changeStatusCard',
    async ({id, status}: { id: string, status: StatusCard.active | StatusCard.paused | StatusCard.inactive }, {dispatch, getState}) => {
        const {auth} = getState() as { auth: IAuthState };

        const res = await instanceApi.put(`/finances/${auth.role}/card/${id}`, {status}, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        dispatch(handleSuccess({message: 'Успешно изменено'}));
        dispatch(getCards({status: status}));
        return res.data.card;
    }
);


export const getCardsById = createAsyncThunk(
    'cards/getCardsById',
    async ({id}: { id: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.get('/finances/cards', {
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

export const cardsFilter = createAsyncThunk(
    'cards/cardsFilter',
    async ({params}:{params: string},{getState}) => {
        const {auth} = getState() as { auth: IAuthState };
        const res = await instanceApi.get(`/finances/${auth.role}/cards?${params.slice(1)}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        return res.data;
    }
);
