import {createAsyncThunk} from '@reduxjs/toolkit';
import {instanceApi} from '../../../api';
import {getAccount, IAppState} from '../../../store/app.slice';
import {ISignInRequest, ISignUpRequest} from './types';
import {IAuthState, setStatusConfirm} from './auth.slice';

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({email, invitation_code, password}: ISignUpRequest, {dispatch}) => {
        const res = await instanceApi.post('/account/trader/registration', {email, invitation_code, password});
        return res.data;
    }
);

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({email, password}: ISignInRequest, {dispatch}) => {
        const res = await instanceApi.post('/account/login', {email, password});
        return res.data;
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async ({email}: { email: string }, {dispatch}) => {
        const res = await instanceApi.post('/account/restore', {email});
        return res.data.sendEmail;
    }
);

export const restoreConfirmation = createAsyncThunk(
    'auth/restoreConfirmation',
    async ({params}: {params:string}) => {
        const res = await instanceApi.put(`/account/${params}`, null);
        return res.data;
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async ({newPassword}: { newPassword: string }, {dispatch, getState}) => {
        const {auth} = getState() as { auth: IAuthState };
        const {app} = getState() as { app: IAppState };

        const res = await instanceApi.post('/account/password', {newPassword}, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        dispatch(signIn({email: app.commonData.email, password: newPassword}));
        return res.data;
    }
);

export const changeDisplayName = createAsyncThunk(
    'auth/changeDisplayName',
    async ({displayName}: { displayName: string }, {dispatch, getState}) => {
        const {auth} = getState() as { auth: IAuthState };
        const res = await instanceApi.post('/account/display-name', {displayName}, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        return res.data;
    }
);

export const changeEmail = createAsyncThunk(
    'auth/changeEmail',
    async ({email}: { email: string }, {dispatch, getState}) => {
        const {auth} = getState() as { auth: IAuthState };

        await instanceApi.post('/account/email', {email}, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
    }
);

export const confirmEmail = createAsyncThunk(
    'auth/confirmEmail',
    async ({code, email}: { code: string, email: string }, {dispatch, getState}) => {
        const {auth} = getState() as { auth: IAuthState };
        const res = await instanceApi.post('/account/email/confim', {code, email}, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        dispatch(setStatusConfirm(res.data.status));
        dispatch(getAccount());
        return res.data;
    }
);
