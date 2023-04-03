import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {mockInstanceApi} from '../../../api';
import {authDb} from '../../../db';
import {ISignInRequest, ISignUpRequest} from './types';

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({login, code, password}: ISignUpRequest, {dispatch}) => {
        try {
            await mockInstanceApi.onPost('/registration', {login, code, password})
                .reply(200, authDb({email: login}));
            const res = await axios.post('/registration', {login, code, password});
            return res.data;
        } catch (e) {
        }
    }
);

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({login, password}: ISignInRequest, {dispatch}) => {
        try {
            await mockInstanceApi.onPost('/login', {login, password})
                .reply(200, authDb({email: login}));
            const res = await axios.post('/login', {login, password});
            return res.data;
        } catch (e) {
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
        } catch (e) {
        }
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async ({password}: { password: string }, {dispatch}) => {
        try {
            await mockInstanceApi.onPost('/forgot-password', {password})
                .reply(200, authDb({email: 'some User email'}));
            const res = await axios.post('/forgot-password', {password});
            return res.data;
        } catch (e) {
        }
    }
);
