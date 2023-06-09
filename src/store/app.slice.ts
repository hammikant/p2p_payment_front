import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ICommonData, IError, ISuccess} from '../types';
import {IAuthState} from '../pages/auth/store/auth.slice';
import {instanceApi} from '../api';

export interface IAppState {
    loading: boolean;
    error: IError | null;
    success: ISuccess | null;
    commonData: ICommonData
}

const initialState: IAppState = {
    loading: false,
    error: null,
    success: null,
    commonData: {
        balance: 0,
        incomeToday: 0,
        role: 'trader',
        email: '',
        wallet: '',
        walletQRCode: '',
        exchangeRates: {
            buyingRate: 0,
            sellingRate: 0,
            trand: 'up'
        },

    }
};

export const getAccount = createAsyncThunk(
    'app/getAccount',
    async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };

            const res = await instanceApi.get('/account', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            return res.data;
        } catch (e) {

        }
    }
);

export const getMoreHistory = createAsyncThunk(
    'app/getMoreHistory',
    async ({url}: { url: string }, {dispatch, getState}) => {
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

export const terminateSessions = createAsyncThunk(
    'app/terminateSessions',
    async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await instanceApi.post('terminate', null, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        handleError: (state, {payload}: { payload: IError | null }) => {

            state.error = payload;
        },
        handleSuccess: (state, {payload}: { payload: ISuccess | null }) => {
            state.success = payload;
        },
        clearStorage: () => {
        }
    },
    extraReducers: builder => {
        builder.addCase(getAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAccount.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.commonData.balance = payload.balance;
            state.commonData.incomeToday = payload.incomeToday;
            state.commonData.wallet = payload.wallet;
            state.commonData.walletQRCode = payload.walletQRCode;
            state.commonData.exchangeRates = payload.exchangeRates;
            state.commonData.role = payload.role;
            state.commonData.email = payload.email;
        });
        builder.addCase(getAccount.rejected, (state) => {
            state.loading = true;
        });
        // builder.addCase(getMoreHistory.pending, (state) => {
        //     state.loading = true;
        // });
        // builder.addCase(getMoreHistory.fulfilled, (state, {payload}) => {
        //     state.loading = false;
        //     state.commonData.meta = payload.meta;
        //     state.commonData.historyActions = payload.historyActions;
        // });
        // builder.addCase(getMoreHistory.rejected, (state) => {
        //     state.loading = true;
        // });

    }
});

export const {handleError, handleSuccess, clearStorage} = appSlice.actions;

export default appSlice.reducer;
