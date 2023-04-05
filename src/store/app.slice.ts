import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ICommonData, IError, ISuccess} from '../types';
import {IAuthState} from '../pages/auth/store/auth.slice';
import {instanceApi, mockInstanceApi} from '../api';
import {commonDb} from '../db/common_db';

interface IAppState {
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
        balanceUs: 0,
        incomeToday: 0,
        incomeTodayUs: 0,
        wallet: '',
        walletQRCode: '',
        exchangeRates: {
            buyingRate: 0,
            currentRate: 0,
            trend: 'up'
        }
    }
};

export const getCommonData = createAsyncThunk(
    'app/getCommonData',
    async (_, {dispatch, getState}) => {
        try {
            const {auth} = getState() as { auth: IAuthState };
            await mockInstanceApi.onGet('/get-common-date').reply(200, commonDb(), {
                Authorization: `Bearer ${auth.token}`
            });
            const res = await instanceApi.get('/get-common-date', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            return res.data;
        } catch (e) {

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
        builder.addCase(getCommonData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCommonData.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.commonData.balance = payload.balance;
            state.commonData.balanceUs = payload.balanceUs;
            state.commonData.incomeToday = payload.incomeToday;
            state.commonData.incomeTodayUs = payload.incomeTodayUs;
            state.commonData.wallet = payload.wallet;
            state.commonData.walletQRCode = payload.walletQRCode;
            state.commonData.exchangeRates = payload.exchangeRates;
        });
        builder.addCase(getCommonData.rejected, (state) => {
            state.loading = true;
        });
    }
});

export const {handleError, handleSuccess, clearStorage} = appSlice.actions;

export default appSlice.reducer;
