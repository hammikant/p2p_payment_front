import {createAsyncThunk} from '@reduxjs/toolkit';
import {instanceApi} from '../../../api';
import {getAccount, handleError, IAppState} from '../../../store/app.slice';
import {ISignInRequest, ISignUpRequest} from './types';
import {IAuthState, setStatusConfirm} from './auth.slice';

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({email, code, password}: ISignUpRequest, {dispatch}) => {
        try {
            const res = await instanceApi.post('/account/registration', {email, code, password});

            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({email, password}: ISignInRequest, {dispatch}) => {
        try {
            const res = await instanceApi.post('/account/login', {email, password});

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
            const res = await instanceApi.post('/account/restore', {login});
            return res.data.sendEmail;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async ({newPassword}: { newPassword: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            const {app} = getState() as { app: IAppState };

            const res = await instanceApi.post('/account/password', {newPassword}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(signIn({email: app.commonData.email, password: newPassword}));
            return res.data;
        } catch (e: any) {
            if (e.response.data?.non_field_errors.length > 0) {
                for (const eElement of e.response.data?.non_field_errors) {
                    dispatch(handleError({message: eElement, errors: {}}));
                }
            } else {
                dispatch(handleError({message: e.response.message, errors: {}}));
            }

        }
    }
);

export const changeDisplayName = createAsyncThunk(
    'auth/changeDisplayName',
    async ({displayName}: { displayName: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            const res = await instanceApi.post('/account/display-name', {displayName}, {
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
    async ({email}: { email: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            await instanceApi.patch('/account/email', {email}, {
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
    async ({code, email}: { code: string, email: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            const res = await instanceApi.post('/account/email/confim', {code, email}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(setStatusConfirm(res.data.status));
            dispatch(getAccount());
            return res.data;
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);
