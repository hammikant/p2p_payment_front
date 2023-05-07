import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {instanceApi, mockInstanceApi} from '../../../api';
import {authDb} from '../../../db';
import {handleError} from '../../../store/app.slice';
import {ROLE} from '../../../utils/constants';
import {ISignInRequest, ISignUpRequest} from './types';
import {IAuthState, setStatusConfirm} from './auth.slice';

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({login, code, password}: ISignUpRequest, {dispatch}) => {
        try {
            await mockInstanceApi.onPost('/registration', {login, code, password})
                .reply(200, authDb({email: login, role: 'merchant'}));
            const res = await axios.post('/registration', {login, code, password});
            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({login, password}: ISignInRequest, {dispatch}) => {
        try {
            await mockInstanceApi.onPost('/login', {login, password})
                .reply(200, authDb({email: login, role: ROLE}));
            const res = await axios.post('/login', {login, password});
            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async ({login}: { login: string }, {dispatch}) => {
        try {
            await mockInstanceApi.onPost('/forgot-password', {login})
                .reply(200, {sendEmail: login});
            const res = await axios.post('/forgot-password', {login});
            return res.data.sendEmail;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async ({password}: { password: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/change-password', {password})
                .reply(200, authDb({email: auth.user.email, role: ROLE}), {
                    Authorization: `Bearer ${auth.token}`
                });
            const res = await axios.post('/change-password', {password}, {
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

export const changeDisplayName = createAsyncThunk(
    'auth/changeDisplayName',
    async ({displayName}: { displayName: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/change-displayname', {displayName})
                .reply(200, authDb({
                    email: auth.user.email,
                    displayName,
                    role: ROLE
                }), {
                    Authorization: `Bearer ${auth.token}`
                });
            const res = await instanceApi.post('/change-displayname', {displayName}, {
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

export const changeEmail = createAsyncThunk(
    'auth/changeEmail',
    async ({login}: { login: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/change-email', {login}).reply(200, null, {
                Authorization: `Bearer ${auth.token}`
            });
            await axios.post('/change-email', {login}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const confirmEmail = createAsyncThunk(
    'auth/confirmEmail',
    async ({code}: { code: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onPost('/confirm-email', {code}).reply(200, {status: 'success'}, {
                Authorization: `Bearer ${auth.token}`
            });

            const res = await axios.post('/confirm-email', {code}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(setStatusConfirm(res.data.status));
            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);
