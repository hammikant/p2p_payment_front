import {createAsyncThunk, createSlice, Draft} from '@reduxjs/toolkit';
import {ICommonData, IError, ISuccess} from '../types';
import {IAuthState} from '../pages/auth/store/auth.slice';
import {instanceApi} from '../api';

export interface IAppState {
    loading: boolean;
    error: IError | null;
    success: ISuccess | null;
    commonData: ICommonData;
    exchangeRates: {
        usdtrub: number;
    };
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
        walletQR: '',
        frozenBalance: '',
        onPaymentBalance: '',
        displayName: ''
    },
    exchangeRates: {
        usdtrub: 0
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

export const getExchangeRates = createAsyncThunk(
    'app/getExchangeRates',
    async (_, {getState, dispatch}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            const res = await instanceApi.get('/finances/exchange-rates', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            return res.data;
        } catch (e:any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

export const terminateSessions = createAsyncThunk(
    'app/terminateSessions',
    async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await instanceApi.put('/account/terminate', null, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            dispatch(handleSuccess({message: 'Вы вышли со всех устройств, кроме текущего.'}));
        } catch (e: any) {
            dispatch(handleError({message: e.response.message, errors: {}}));
        }
    }
);

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        handleError: (state: Draft<IAppState>, {payload}: { payload: IError | null }) => {
            state.error = payload;
        },
        handleSuccess: (state: Draft<IAppState>, {payload}: { payload: ISuccess | null }) => {
            state.success = payload;
        },
        clearStorage: () => {
        }
    },
    extraReducers: builder => {
        builder.addCase(getAccount.pending, (state: Draft<IAppState>) => {
            state.loading = true;
        });
        builder.addCase(getAccount.fulfilled, (state: Draft<IAppState>, {payload}) => {
            state.loading = false;
            state.commonData.balance = payload.balance;
            state.commonData.incomeToday = payload.incomeToday;
            state.commonData.wallet = payload.wallet;
            state.commonData.walletQR = payload.walletQR;
            state.commonData.frozenBalance = payload.frozenBalance;
            state.commonData.onPaymentBalance = payload.onPaymentBalance;
            state.commonData.role = payload.role;
            state.commonData.email = payload.email;
            state.commonData.displayName = payload.displayName;
        });
        builder.addCase(getAccount.rejected, (state: Draft<IAppState>) => {
            state.loading = true;
        });
        builder.addCase(getExchangeRates.fulfilled, (state, {payload}) => {
            state.exchangeRates = payload;
        });
    }
});

export const {handleError, handleSuccess, clearStorage} = appSlice.actions;

export default appSlice.reducer;
