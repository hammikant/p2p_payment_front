import {createSlice} from '@reduxjs/toolkit';
import {IMetaResponse} from '../../../types';
import {changeDisplayName, changePassword, forgotPassword, signIn, signUp} from './auth.thunk';

export interface IHistoryActions {
    data: string;
    action: string;
    IPAddress: string;
    id: number,
    userAgent: string;
}

export interface IUser {
    email: string;
    changeDataPassword: string;
    displayName: string;
    role: 'trader' | 'merchant';
}

export interface IAuthState {
    isAuth: boolean;
    loading: boolean;
    role: 'trader' | 'merchant';
    statusConfirm: 'success' | 'rejected' | null;
    token: string | null;
    sendEmailForgotPassword: string;
    successForgot: boolean;
    user: IUser;
    historyActions: IHistoryActions[];
    meta: IMetaResponse;
}

const initialState: IAuthState = {
    isAuth: false,
    loading: false,
    statusConfirm: null,
    role: 'trader',
    token: null,
    sendEmailForgotPassword: '',
    successForgot: false,
    user: {
        email: '',
        changeDataPassword: '',
        displayName: '',
        role: 'trader',
    },
    historyActions: [],
    meta: {
        total: 0,
        nextPageUrl: null,
        prevPageUrl: null,
        isLastPage: false
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAppLoader: (state, {payload}) => {
            state.loading = payload;
        },
        clearForgotModal: (state) => {
            state.sendEmailForgotPassword = '';
            state.successForgot = false;
        },
        setStatusConfirm: (state, {payload}) => {
            state.statusConfirm = payload;
        },
        setUserData: (state, {payload}) => {
            state.user.email = payload.email;
            state.user.changeDataPassword = payload.changeDataPassword;
            state.user.displayName = payload.displayName;
            state.user.role = payload.role;
            //state.meta = payload.meta;
            //state.historyActions = payload.historyActions;
        }
    },
    extraReducers: builder => {
        builder.addCase(signUp.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.token = action.payload.token;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(signIn.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.role = action.payload.role;
            state.token = action.payload.token;
            authSlice.caseReducers.setUserData(state, action);
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
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.token = action.payload.token;
            authSlice.caseReducers.setUserData(state, action);
        });
        builder.addCase(changePassword.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(changeDisplayName.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.token = action.payload.token;
            authSlice.caseReducers.setUserData(state, action);
        });
    }
});

export const {clearForgotModal, setAppLoader, setStatusConfirm} = authSlice.actions;

export default authSlice.reducer;
