import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {mockInstanceApi} from '../../../api';
import {auth_db} from '../../../db';
import {ISignUpRequest} from './types';

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({login, code, password}:ISignUpRequest, {dispatch}) => {
        try {
            await mockInstanceApi.onPost('/login', {login, code, password})
                .reply(200, auth_db);
            const res = await axios.post('/login', {login, code, password});
            return res.data.token;
        } catch (e) {

        }
    }
);
