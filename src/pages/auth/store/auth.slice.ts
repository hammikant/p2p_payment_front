import {createSlice} from '@reduxjs/toolkit';
import {changePassword, forgotPassword, signIn, signUp} from './auth.thunk';

interface IUser {
    email: string
}

export interface IAuthState {
    isAuth: boolean;
    loading: boolean;
    token: string | null;
    sendEmailForgotPassword: string;
    successForgot: boolean;
    user: IUser
}

const initialState: IAuthState = {
    isAuth: false,
    loading: false,
    token: null,
    sendEmailForgotPassword: '',
    successForgot: false,
    user: {
        email: ''
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearForgotModal: (state) => {
            state.sendEmailForgotPassword = '';
            state.successForgot = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(signUp.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signUp.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.isAuth = true;
            state.token = payload.token;
            state.user.email = payload.email;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(signIn.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signIn.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.isAuth = true;
            state.token = payload.token;
            state.user.email = payload.email;
        });
        builder.addCase(signIn.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(forgotPassword.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.sendEmailForgotPassword = payload;
            state.successForgot = true;
        });
        builder.addCase(forgotPassword.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(changePassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changePassword.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.isAuth = true;
            state.token = payload.token;
            state.user.email = payload.email;
        });
        builder.addCase(changePassword.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const {clearForgotModal} = authSlice.actions;

export default authSlice.reducer;
